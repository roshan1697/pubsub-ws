import { WebSocketServer } from "ws";
import { User } from "./user";

const wss = new  WebSocketServer({
    port:8001
})

wss.on('connection', (ws)=>{
    console.log('ws server started')
    const user = new User()
    ws.on('error', console.error)

    ws.on('message', (msg)=> {
        const data = JSON.parse(msg.toString())
        if(data.type === 'sub'){
            user.subTicker(data.stock)
        }
        if(data.type === 'unsub'){
            user.unSubTicker(data.stock)
        }

    })

    ws.on('close',()=>{
        user.removeUser()
    })

})