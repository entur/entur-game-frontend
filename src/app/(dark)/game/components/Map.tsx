import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { Event, StopPlace } from '@/lib/types/types'
import MapPin from '!!raw-loader!@/lib/assets/icons/MapPin.svg'
import Destination from '!!raw-loader!@/lib/assets/icons/Destination.svg'
import Standing from '!!raw-loader!@/lib/assets/icons/Standing.svg'

const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

if (!NEXT_PUBLIC_MAPBOX_TOKEN) {
    throw new Error('Mapbox token is not defined')
}

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN

type Props = {
    event: Event
    currentPosition: StopPlace
}

const Map = ({ event, currentPosition }: Props) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const mapRef = useRef<mapboxgl.Map | null>(null)

    useEffect(() => {
        if (
            mapContainerRef.current &&
            currentPosition?.longitude &&
            currentPosition.latitude
        ) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [currentPosition.longitude, currentPosition.latitude],
                zoom: 4,
            })

            mapRef.current = map

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

            if (
                currentPosition &&
                currentPosition.latitude &&
                currentPosition.longitude
            ) {
                const currentEl = document.createElement('div')
                currentEl.innerHTML = Standing
                currentEl.style.width = '70px'
                currentEl.style.height = '70px'
                currentEl.style.display = 'flex'
                currentEl.style.alignItems = 'flex-end'
                currentEl.style.justifyContent = 'center'

                new mapboxgl.Marker(currentEl, { anchor: 'bottom' })
                    .setLngLat([
                        currentPosition.longitude,
                        currentPosition.latitude,
                    ])
                    .addTo(map)
            }

            return () => {
                if (mapRef.current) {
                    mapRef.current.remove()
                }
            }
        }
    }, [
        event.startLocation.latitude,
        event.startLocation.longitude,
        event.endLocation,
        currentPosition,
    ])

    return <div ref={mapContainerRef} className="map-container" />
}

export default Map