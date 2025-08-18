import {createClient, RedisClientType} from 'redis'

export class PubSubManager {
    private static instance:PubSubManager
    private client: RedisClientType
    private subscribe: Map<string, string[]>

    constructor () {
        this.client =  createClient()
        this.client.connect().catch(err => console.error(err))
        this.subscribe = new Map()
    }
    static getInstance = () => {
        if(this.instance){
            return this.instance
        }
        return this.instance = new PubSubManager()
    }
    handleMessage = (stock:string, message: string) => { console.log('stock: ' + stock + ' message: ' + message)}
    addUserSubscription = (userId:string , stock:string) =>{
        if(!this.subscribe.has(stock)){
            this.subscribe.set(stock, [])
        }
        this.subscribe.get(stock)?.push(userId)
        if(this.subscribe.get(stock)?.length == 1){
            this.client.SUBSCRIBE(stock,(message)=>{
                this.handleMessage(stock, message)
            })
        }
    }
    removeUserSubscription = (stock:string, userId:string) =>{
        this.subscribe.get(stock)?.filter(id => id == userId).pop()
    }



}

