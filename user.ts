import { PubSubManager } from "./pubsub"


export class User {
    id:string

    constructor () {
        this.id = crypto.randomUUID()
    }

    subTicker = (ticker:string) => {
        PubSubManager.getInstance().addUserSubscription(ticker,this.id)
    }

    unSubTicker = (ticker:string) => {
        PubSubManager.getInstance().removeUserSubscription(ticker,this.id)
    }

    removeUser = () =>{
        PubSubManager.getInstance().removeAllUserSub(this.id)
    }
}