// components/Map.tsx
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import styles from './Map.module.css'

const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

if (!NEXT_PUBLIC_MAPBOX_TOKEN) {
    throw new Error('Mapbox token is not defined')
}

mapboxgl.accessToken = NEXT_PUBLIC_MAPBOX_TOKEN

const Map = () => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [10.7522, 59.9139], // Example coordinates for Oslo
                zoom: 5,
                attributionControl: false,
            })

            return () => map.remove()
        }
    }, [])

    return <div ref={mapContainerRef} className={styles.mapContainer} />
}

export default Map
