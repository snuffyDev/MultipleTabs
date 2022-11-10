export interface Message {
    message: DocumentVisibilityState;
}

export interface ChannelMessage extends Message {
    id: string;
}

export class TypedBroadcastChannel<T extends ChannelMessage = ChannelMessage> extends BroadcastChannel {
    private _id: string;

    constructor(name: string) {
        super(name);
        this._id = crypto.randomUUID();
    }

    public get id() {
        return this._id;
    }

    public override postMessage(message: Message): void {
        super.postMessage({...message, id: this._id });
    }



}

export const channel = new TypedBroadcastChannel('tabComm');