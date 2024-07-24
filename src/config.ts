export const baseUrl = (() => {
    if (typeof window !== 'undefined') {
        switch (window.location.hostname) {
            case 'entur-game.entur.org':
                return 'https://api.entur.io/entur-game-backend/v1'
            case 'entur-game.staging.entur.org':
                return 'https://api.staging.entur.io/entur-game-backend/v1'
            default:
                return 'http://localhost:8080'
        }
    } else {
        return process.env.apiUrl
    }
})()
