export interface ChatModel {
    id: string,
    messages: Message[]
}

export interface Message {
    roomId: string,
    text: string,
    from: string,
    date: string
}
