import { Client } from '@stomp/stompjs'

const client = new Client()

export function useStompJs() {
    return { client }
}
