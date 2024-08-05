import { QueryMode } from '@entur/sdk'
import { SintefVehicle } from '@/lib/types/emissionsResponse'

//TODO-1: Implement this function
export function modeToSintefVehicle(mode: QueryMode | null): SintefVehicle {
    if (mode === QueryMode.BUS) return SintefVehicle.bus // TODO-2: temporary return value
    return SintefVehicle.rail
}
