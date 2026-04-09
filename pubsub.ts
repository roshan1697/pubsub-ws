import {createClient, type RedisClientType} from 'redis'

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
    private handleMessage = (stock:string, message: string) => { console.log('stock: ' + stock + ' message: ' + message)}
    addUserSubscription = (stock:string, userId:string) =>{
        if(!this.subscribe.has(stock)){
            this.subscribe.set(stock, [])
        }
        this.subscribe.get(stock)?.push(userId)
        if(this.subscribe.get(stock)?.length === 1){
            this.client.SUBSCRIBE(stock,(message)=>{
                
                this.handleMessage(stock, message)
            })
        }
    }
    removeUserSubscription = (stock:string, userId:string) =>{
        this.subscribe.get(stock)?.filter(id => id === userId).pop()

        if(this.subscribe.get(stock)?.length === 0){
            this.subscribe.delete(stock)
            this.client.UNSUBSCRIBE(stock, (message)=>{
                this.handleMessage(stock, message)
            })
        }
    }

    removeAllUserSub = (userId:string) => {
        for (const [key, valuesArray] of this.subscribe.entries()){
            const filtered = valuesArray.filter(id => id !== userId)
            if(filtered.length === 0 ){
                this.subscribe.delete(key)
                this.client.UNSUBSCRIBE(key, (message)=>{
                this.handleMessage(key, message)
            })
            }
            else {
                this.subscribe.set(key,filtered)
            }
        }
    }


}

