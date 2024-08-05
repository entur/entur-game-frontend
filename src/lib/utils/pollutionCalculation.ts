import { StopPlace } from "../types/types"
import { CO2eLeg } from "@/app/providers/CO2Provider";
import { QueryMode } from "@entur/sdk";



export async function getEmissionForCar(startLocation: StopPlace, endLocation: StopPlace[]){
    
    const response = await fetch('https://emapi.sintef.no/api/v1/energy',
        {
            method: 'POST',
            headers:{
                'AuthKey': 'APIKEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "vehicle": "web:average-private-vehicle-diesel",
                "sourceSrid": 4326,
                "route": {
                  "stopIds": [startLocation.id, endLocation[0].id]
                }
              })
        }
    )
    return await response.json();
}

export async function getEmissionForTrip(fullTravel: CO2eLeg[]){
    const response = await fetch('https://emapi.sintef.no/api/v1/energy/multi',
        {
            method: 'POST',
            headers:{
                'AuthKey': 'APIKEY',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fullTravel)
        }
    )
    
    return await response.json();
}

export enum SintefVehicle {
    rail = 'web:average-private-vehicle-diesel',
    bus = 'web:average-bus',
    tram = 'web:average-tram',
    metro = 'web:average-metro',
    ferry = 'web:average-ferry',
    car = 'web:average-private-vehicle-diesel',
    bike = 'web:average-bike',
    walk = 'web:average-walk',
}

//TODO-1: Implement this function
export function modeToSintefVehicle(mode: QueryMode | null): SintefVehicle {
    return SintefVehicle.rail
}
