// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";
import {serverStack} from "../../libs/memory";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, event}: { name: string, event: string } = req.body

    if(event === 'request-end'){
        await prisma.$connect()
        if(serverStack.length > 0 && serverStack[serverStack.length - 1].name === name){
            serverStack.pop()
        }
        return res.end()
    }

    await prisma.$connect()
    const endpoint_to_map =  await prisma.endpoint.findFirst({
        where: {
            // @ts-ignore
            is_mapped: false
        }
    })
    if(!endpoint_to_map){
        // handle number of queries later versions
        return res.end()
    }

    const service = await prisma.service.findFirst({
        where: {
            name: name
        }
    })

    if (!service) {
        return res.end()
    }

    if(serverStack.length > 0){
        const parent = serverStack[serverStack.length - 1]
        if (parent.id !== service.id) {
            await prisma.serviceEdges.update({
                where: {
                    from_id_to_id: {
                        from_id: parent.id,
                        to_id: service.id
                    }
                },
                data: {
                    count: {
                        increment: 1
                    }
                }
            })
        }
    }
    serverStack.push(service)

    await prisma.endpointService.create({
        data: {
            service: {
                connect: {
                    name: name
                }
            },
            endpoint: {
                connect: {
                    id: endpoint_to_map.id
                }
            }
        }
    })

    await prisma.$disconnect()

    res.status(201).end()
}
