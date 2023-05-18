import { Client } from '@stomp/stompjs'

const client = new Client()
const baseUrl = import.meta.env.VITE_APP_BACKEND_WS

type Props = {
    client: Client
    configureWebSocket: () => void
}

export function useStompJs(): Props {
    const configure = () => {
        client.configure({
            brokerURL: `${baseUrl}/game-ws`,
            onConnect: () => {
                console.log('onConnect')
            },
            // Helps during debugging, remove in production
            debug: (str) => {
                console.log(new Date(), str)
            },
        })
        client.activate()
    }

    return { client, configureWebSocket: configure }
}
