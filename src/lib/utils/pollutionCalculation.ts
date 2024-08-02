import { StopPlace } from "../types/types"



export async function getEmissionForCar(startLocation: StopPlace, endLocation: StopPlace[]){
    
    const response = await fetch('https://emapi.sintef.no/api/v1/energy',
        {
            method: 'POST',
            headers:{
                'AuthKey': 'YOUR_API_KEY',
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

export async function getEmissionForTrip(startLocation: StopPlace, endLocation: StopPlace[]){
    const response = await fetch('https://emapi.sintef.no/api/v1/energy/multi',
        {
            method: 'POST',
            headers:{
                'AuthKey': 'YOUR_API_KEY',
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
