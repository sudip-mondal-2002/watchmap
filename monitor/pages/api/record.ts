// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Collection, Event, Script} from "postman-collection";
import * as fs from "fs";
import newman from "newman";
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await prisma.$connect()
    const collection = new Collection(JSON.parse(req.body))
    const preRequestScript = new Script({
        exec: [
            `pm.sendRequest(\`${process.env.PROJECT_HOST}/api/start-request?current_request=\${pm.request.url.getPath()}\`);`
        ]
    })
    const testScript = new Script({
        exec: [
            `pm.sendRequest(\`${process.env.PROJECT_HOST}/api/end-request?current_request=\${pm.request.url.getPath()}\`);`
        ]
    })

    const preRequestEvent = new Event({
        listen: 'prerequest',
        script: preRequestScript
    })

    const testEvent = new Event({
        listen: 'test',
        script: testScript
    })

    collection.events.add(preRequestEvent)
    collection.events.add(testEvent)

    fs.writeFileSync('collection.json', JSON.stringify(collection.toJSON()))
    await prisma.endpointService.deleteMany({})
    await prisma.endpoint.deleteMany({})
    newman.run({
        collection: 'collection.json',
        // run requests one by one
        iterationCount: 1,
        reporters: 'cli'
    })
    await prisma.$disconnect()

    res.end()
}
