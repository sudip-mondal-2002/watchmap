// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await prisma.$connect()
    await prisma.endpointService.deleteMany({})
    await prisma.serviceInstance.deleteMany({})
    await prisma.serviceEdges.deleteMany({})
    await prisma.service.deleteMany({})
    await prisma.$disconnect()
    res.end()
}
