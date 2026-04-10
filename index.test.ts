import {describe,test,expect, beforeAll} from 'bun:test'

const WS_URL = 'ws://localhost:8001'

describe('websocket pubsub test',()=>{
    let ws1:WebSocket
    let ws2:WebSocket
    const setWS = async() => {
        ws1 = new WebSocket(WS_URL)
        ws1.onmessage = (e) => {
            console.log(`here: ${e.data}`)
        }
        await new Promise(r => ws1.onopen = r)
        
        ws2 = new WebSocket(WS_URL)

        ws2.onmessage = (e) => {
            console.log(`here: ${e.data}`)
        }

        await new Promise( r => ws2.onopen = r)
    }
    beforeAll(async()=>{
        await setWS()
    })
    test('sub of the stock',()=>{
        ws1.send(JSON.stringify({
            'type':'sub',
            'stock': 'T_TH'
        }))
    })
})