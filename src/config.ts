export const ENVIRONMENT: 'PROD' | 'STAGING' | 'LOCAL' = (() => {
    switch (window.location.hostname) {
        case 'entur-game.entur.org':
            return 'PROD'
        case 'entur-game.staging.entur.org':
            return 'STAGING'
        default:
            return 'LOCAL'
    }
})()

export const MAP_BOX_TOKEN = (() => {
    const ENV_MAP_BOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

    if (typeof window === 'undefined') {
        if (!ENV_MAP_BOX_TOKEN) throw Error('Mapbox token is not defined')
        return ENV_MAP_BOX_TOKEN as string
    }

    switch (ENVIRONMENT) {
        case 'PROD':
            return 'pk.eyJ1IjoiZW50dXIiLCJhIjoiY2x6OWlkZDBrMDhvbDJ4czdxMnVwMjJ4YiJ9.mng8swE3lk-TXdLbdOdv2Q'
        case 'STAGING':
            return 'pk.eyJ1IjoiZW50dXIiLCJhIjoiY2x6OWllZDNpMDQyNzJrczgydXhteWdrdCJ9.25MKjylrKRdojFLOQylIag'
        default:
            if (!ENV_MAP_BOX_TOKEN) throw Error('Mapbox token is not defined')
            return ENV_MAP_BOX_TOKEN as string
    }
})()
