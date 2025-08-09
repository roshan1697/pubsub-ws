import {createClient} from 'redis'

export class PubSubManager {
    private static instance:PubSubManager
    private client
    constructor () {
        this.client =  createClient()
        this.client.connect()
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

