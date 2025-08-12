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

    addUserSubscription = () =>{
        
    }
    removeUserSubscription = () =>{
        
    }



}

