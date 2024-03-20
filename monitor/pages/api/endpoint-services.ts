// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    await prisma.$connect()
    const endpointServices = await prisma.endpointService.findMany({
        include: {
            service: true,
            endpoint: true
        }
    })
    const endpoints = await prisma.endpoint.findMany()
    const services = await prisma.service.findMany()

    const data:{
        [key: string]: Set<string>
    } = {}

    for (const endpoint of endpoints) {
        data[endpoint.name] = new Set()
    }
    for (const endpointService of endpointServices) {
        data[endpointService.endpoint.name].add(endpointService.service.name)
    }

    const ret:{
        endpoint: string,
        services: string[]
    }[] = []

    for (const key in data) {
        ret.push({
            endpoint: key,
            services: Array.from(data[key])
        })
    }
    const allEndPoints = endpoints.map((endpoint: any) => endpoint.name)
    const allServices = services.map((service :any) => service.name)


    const graph = await prisma.serviceEdges.findMany({
        include: {
            from: true,
            to: true,
        }
    })

    // add weights of same but opposite edges together
    const edgeMap = new Map<string, any>()
    for (const edge of graph) {
        const key = `${edge.from.name}-${edge.to.name}`
        const key2 = `${edge.to.name}-${edge.from.name}`
        if (edgeMap.has(key)) {
            edgeMap.get(key).count += edge.count
        } else if (edgeMap.has(key2)) {
            edgeMap.get(key2).count += edge.count
        } else {
            edgeMap.set(key, edge)
        }
    }

    const graph2 = Array.from(edgeMap.values())

    const total_edge_weight = graph.reduce((acc, edge) => acc + edge.count, 0)

    await prisma.$disconnect()
    res.status(200).json({
        allEndPoints: allEndPoints,
        allServices: allServices,
        mapping: ret,
        graph: graph2.map(edge => ({
            source: edge.from.name,
            target: edge.to.name,
            weight: edge.count / total_edge_weight,
        }))
    })
}
