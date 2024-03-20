// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../libs/prisma";
import {Service} from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {name, ip, port}: {
        name: string,
        ip: string,
        port: string
    } = req.body

    console.log('register', name, ip, port)

    await prisma.$connect()

    let relatedService = await prisma.service.findFirst({
        where: {
            name: name
        }
    })
    if (!relatedService) {
        relatedService = await prisma.service.create({
            data: {
                name: name || 'unknown'
            }
        })
    }
    await prisma.serviceInstance.create({
        data: {
            ip: ip,
            port: port,
            service: {
                connect: {
                    id: relatedService.id
                }
            }
        }
    })
    const allServices = await prisma.service.findMany({
        where: {
            id: {
                not: relatedService.id
            }
        }
    })
    await prisma.serviceEdges.createMany({
        data: allServices.map((service: Service) => {
            return {
                from_id: relatedService!.id,
                to_id: service.id
            }
        }).concat(allServices.map((service: Service) => {
            return {
                from_id: service.id,
                to_id: relatedService!.id
            }
        })),
        skipDuplicates: true
    })

    await prisma.$disconnect()
    res.status(201).end()
}
