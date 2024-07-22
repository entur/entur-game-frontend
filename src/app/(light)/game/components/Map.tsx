import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import styles from './Map.module.css'
import { Event } from '@/lib/types/types'
import { renderToStaticMarkup } from 'react-dom/server'
import { MapPinIcon, DestinationIcon } from '@entur/icons'

const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

if (!NEXT_PUBLIC_MAPBOX_TOKEN) {
    throw new Error('Mapbox token is not defined')
}

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN

const Map = ({ event }: { event: Event }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [10.7522, 59.9139], // Example coordinates for Oslo
                zoom: 5,
                attributionControl: false,
            })

            if (event.startLocation.longitude && event.startLocation.latitude) {
                const iconHTML = renderToStaticMarkup(
                    <div style={{ width: '50px', height: '50px' }}>
                        <MapPinIcon
                            className="text-coral"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>,
                )

                const el = document.createElement('div')
                el.innerHTML = iconHTML
                el.className = 'custom-marker'

                new mapboxgl.Marker(el, { anchor: 'bottom' })
                    .setLngLat([
                        event.startLocation.longitude,
                        event.startLocation.latitude,
                    ])
                    .addTo(map)

                return () => {
                    if (map) {
                        map.remove()
                    }
                }
            }
        }
    }, [event.startLocation.latitude, event.startLocation.longitude])

    return <div ref={mapContainerRef} className={styles.mapContainer} />
}

export default Map
