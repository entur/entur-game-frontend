import { useRef } from 'react'
import Map, { MapRef, Marker, NavigationControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Event, StopPlace } from '@/lib/types/types'
import MapPin from '!!raw-loader!@/lib/assets/icons/MapPin.svg'
import Destination from '!!raw-loader!@/lib/assets/icons/Destination.svg'
import Standing from '!!raw-loader!@/lib/assets/icons/Standing.svg'

const NEXT_PUBLIC_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

if (!NEXT_PUBLIC_MAPBOX_TOKEN) {
    throw new Error('Mapbox token is not defined')
}

type Props = {
    event: Event
    currentPosition: StopPlace
}

const MapComponent = ({ event, currentPosition }: Props) => {
    const mapRef = useRef<MapRef | null>(null)

    return (
        <Map
            ref={mapRef}
            initialViewState={{
                longitude: currentPosition?.longitude || 0,
                latitude: currentPosition?.latitude || 0,
                zoom: 4,
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={NEXT_PUBLIC_MAPBOX_TOKEN}
        >
            <NavigationControl position="top-right" />

            {event.startLocation.longitude && event.startLocation.latitude && (
                <Marker
                    longitude={event.startLocation.longitude}
                    latitude={event.startLocation.latitude}
                    anchor="bottom"
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: MapPin }}
                        style={{
                            width: '70px',
                            height: '70px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    />
                </Marker>
            )}

            {event.endLocation &&
                event.endLocation[0].longitude &&
                event.endLocation[0].latitude && (
                    <Marker
                        longitude={event.endLocation[0].longitude}
                        latitude={event.endLocation[0].latitude}
                        anchor="bottom"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: Destination }}
                            style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}
                        />
                    </Marker>
                )}

            {currentPosition &&
                currentPosition.latitude &&
                currentPosition.longitude && (
                    <Marker
                        longitude={currentPosition.longitude}
                        latitude={currentPosition.latitude}
                        anchor="bottom"
                    >
                        <div
                            dangerouslySetInnerHTML={{ __html: Standing }}
                            style={{
                                width: '70px',
                                height: '70px',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}
                        />
                    </Marker>
                )}
        </Map>
    )
}

export default MapComponent
