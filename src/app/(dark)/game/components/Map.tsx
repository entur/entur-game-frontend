import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import styles from './Map.module.css'
import { Event } from '@/lib/types/types'
import MapPin from '!!raw-loader!@/lib/assets/icons/MapPin.svg'
import Destination from '!!raw-loader!@/lib/assets/icons/Destination.svg'

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
                center: [10.7522, 59.9139],
                zoom: 5,
            })

            if (event.startLocation.longitude && event.startLocation.latitude) {
                const el = document.createElement('div')
                el.innerHTML = MapPin
                el.style.width = '70px'
                el.style.height = '70px'
                el.style.display = 'flex'
                el.style.alignItems = 'flex-end'
                el.style.justifyContent = 'center'

                new mapboxgl.Marker(el, { anchor: 'bottom' })
                    .setLngLat([
                        event.startLocation.longitude,
                        event.startLocation.latitude,
                    ])
                    .addTo(map)
            }

            if (
                event.endLocation &&
                event.endLocation[0].longitude &&
                event.endLocation[0].latitude
            ) {
                const endEl = document.createElement('div')
                endEl.innerHTML = Destination
                endEl.style.width = '70px'
                endEl.style.height = '70px'
                endEl.style.display = 'flex'
                endEl.style.alignItems = 'flex-end'
                endEl.style.justifyContent = 'center'

                new mapboxgl.Marker(endEl, { anchor: 'bottom' })
                    .setLngLat([
                        event.endLocation[0].longitude,
                        event.endLocation[0].latitude,
                    ])
                    .addTo(map)
            }

            return () => {
                map.remove()
            }
        }
    }, [
        event.startLocation.latitude,
        event.startLocation.longitude,
        event.endLocation,
    ])

    return <div ref={mapContainerRef} className={styles.mapContainer} />
}

export default Map
