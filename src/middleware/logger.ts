import express, {Request, Response, NextFunction} from 'express'
import fs from 'fs'
import path from 'path'
import geoip from 'geoip-lite'



const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

const logger = (req: Request, res: Response, next: NextFunction)=>{
    let clientIp = req.headers['x-real-ip']
    const geop = geoip.lookup(`${clientIp}`)
    console.log(geoip.lookup('35.230.106.76'))
    const log = `${new Date().toISOString()} ${req.method} ${req.url} GEO: ${geop?.country} IP: ${clientIp}`
    console.log(log)
    accessLogStream.write(`${log}\n`)
    next()
}


export default logger