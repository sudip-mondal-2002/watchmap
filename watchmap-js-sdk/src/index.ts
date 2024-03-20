require('dotenv').config();
import {Request, Response} from 'express'
import axios from 'axios'
import {networkInterfaces} from 'os'

const parseNetInterface: Function = (a: any): string => {
    let ipv4 = null
    for (const key in a) {
        for (let i = 0; i < a[key].length; i++) {
            const obj = a[key][i];
            if (obj["family"] === "IPv4" && !obj["internal"]) {
                ipv4 = obj["address"]
                return ipv4
            }
        }
    }
    return "Not Found"
}

const validateEnv: Function = (
    WATCHMAP_SERVICE_NAME: string | undefined,
    WATCHMAP_SERVER_REGISTER_URL: string | undefined,
    PORT: string | undefined): void => {
    let errMsg: string = ""
    if (!WATCHMAP_SERVICE_NAME) errMsg += "Service Name not defined: Add process.env.WATCHMAP_SERVICE_NAME to your .env file\n"
    if (!WATCHMAP_SERVER_REGISTER_URL) errMsg += "Watchmap Server Url not defined: Add process.env.WATCHMAP_SERVER_REGISTER_URL to your .env file\n"
    if (!PORT) errMsg += "Your App Port not defined: Add process.env.PORT to your .env file\n"
    if (errMsg) throw new Error(errMsg)
}

const watchmapInitializer = async () => {
    validateEnv(process.env.WATCHMAP_SERVICE_NAME, process.env.WATCHMAP_SERVER_REGISTER_URL, process.env.PORT)
    // API Call to register service with watchmap client
    let config = {
        method: 'post',
        url: `${process.env.WATCHMAP_SERVER_REGISTER_URL}`,
        data: {
            name: process.env.WATCHMAP_SERVICE_NAME,
            ip: parseNetInterface(networkInterfaces()),
            port: process.env.PORT,
        }
    };
    await axios(config)

    return async (request: Request, response: Response, next: Function) => {
        console.log("Middleware Called")
        const serviceName = process.env.WATCHMAP_SERVICE_NAME
        const config = {
            method: 'post',
            url: `${process.env.WATCHMAP_SERVER_REQUEST_MONITOR_URL}`,
            data: {
                name: serviceName,
                event: 'request-started'
            }
        }

        response.on('finish', async () => {
            const config = {
                method: 'post',
                url: `${process.env.WATCHMAP_SERVER_REQUEST_MONITOR_URL}`,
                data: {
                    name: serviceName,
                    event: 'request-ended'
                }
            }
            try {
                await axios(config)
            } catch (err) {
            }
        })

        try {
            await axios(config)
        } catch (err) {
        }
        next()
    }
}
export default watchmapInitializer