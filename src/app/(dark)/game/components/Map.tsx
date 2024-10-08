import { useEffect, useState } from 'react'
import Map, { Marker, NavigationControl, MapRef } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Event, StopPlace } from '@/lib/types/types'
import MapPin from '!!raw-loader!@/lib/assets/icons/MapPin.svg'
import Destination from '!!raw-loader!@/lib/assets/icons/Destination.svg'
import Standing from '!!raw-loader!@/lib/assets/icons/Standing.svg'
import mapboxgl from 'mapbox-gl'
import { MAP_BOX_TOKEN } from '@/config'

type Props = {
    event: Event
    currentPosition: StopPlace
    handleMarkerClick: (longitude: number, latitude: number) => void
    mapRef: React.RefObject<MapRef>
}

const MapComponent = ({
    event,
    currentPosition,
    handleMarkerClick,
    mapRef,
}: Props) => {
    const [mapLoaded, setMapLoaded] = useState(false)

    useEffect(() => {
        const checkMapLoaded = setInterval(() => {
            if (mapRef.current) {
                setMapLoaded(true)
                clearInterval(checkMapLoaded)
            }
        }, 100)
    }, [mapRef])

    useEffect(() => {
        if (
            mapLoaded &&
            mapRef.current &&
            currentPosition &&
            event.endLocation
        ) {
            const map = mapRef.current.getMap()
            const bounds = new mapboxgl.LngLatBounds()

            if (
                currentPosition.longitude !== undefined &&
                currentPosition.latitude !== undefined
            ) {
                bounds.extend([
                    currentPosition.longitude,
                    currentPosition.latitude,
                ])
            }
            if (
                event.endLocation[0]?.longitude !== undefined &&
                event.endLocation[0]?.latitude !== undefined
            ) {
                bounds.extend([
                    event.endLocation[0].longitude,
                    event.endLocation[0].latitude,
                ])
            }

            if (bounds.isEmpty()) {
                return
            }

            map.fitBounds(bounds, {
                padding: { top: 100, bottom: 100, left: 50, right: 50 },
                maxZoom: 15,
            })
        }
    }, [mapLoaded, currentPosition, event.endLocation, mapRef])

    return (
        <div className="map-container rounded-lg overflow-hidden">
            <Map
                ref={mapRef}
                initialViewState={{
                    longitude: currentPosition?.longitude || 0,
                    latitude: currentPosition?.latitude || 0,
                    zoom: 4,
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={MAP_BOX_TOKEN}
            >
                <NavigationControl position="top-right" showCompass={false} />

                {event.startLocation.longitude !== undefined &&
                    event.startLocation.latitude !== undefined && (
                        <Marker
                            longitude={event.startLocation.longitude}
                            latitude={event.startLocation.latitude}
                            anchor="bottom"
                            onClick={() =>
                                handleMarkerClick(
                                    event.startLocation.longitude!,
                                    event.startLocation.latitude!,
                                )
                            }
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: MapPin }}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            />
                        </Marker>
                    )}

                {event.endLocation &&
                    event.endLocation[0]?.longitude !== undefined &&
                    event.endLocation[0]?.latitude !== undefined && (
                        <Marker
                            longitude={event.endLocation[0].longitude}
                            latitude={event.endLocation[0].latitude}
                            anchor="bottom"
                            onClick={() =>
                                handleMarkerClick(
                                    event.endLocation[0].longitude!,
                                    event.endLocation[0].latitude!,
                                )
                            }
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: Destination,
                                }}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            />
                        </Marker>
                    )}

                {currentPosition &&
                    currentPosition.latitude !== undefined &&
                    currentPosition.longitude !== undefined && (
                        <Marker
                            longitude={currentPosition.longitude}
                            latitude={currentPosition.latitude}
                            anchor="bottom"
                            onClick={() =>
                                handleMarkerClick(
                                    currentPosition.longitude!,
                                    currentPosition.latitude!,
                                )
                            }
                        >
                            <div
                                dangerouslySetInnerHTML={{ __html: Standing }}
                                style={{
                                    width: '70px',
                                    height: '70px',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            />
                        </Marker>
                    )}
            </Map>
        </div>
    )
}

export default MapComponent
