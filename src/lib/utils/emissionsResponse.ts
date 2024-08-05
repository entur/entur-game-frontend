export interface EmissionRespose {
    source:      Source;
    results:     Results[];
    versionCode: number;
}

export interface Results {
    travelTimeS:          number;
    routeLengthKm:        number;
    averageSpeedKmH:      number;
    regenerationKwH:      number;
    engineWorkKwH:        number;
    brakeWorkKwH:         number;
    engineConsumptionKwH: number;
    fuelConsumption:      FuelConsumption[];
    emissions:            Emissions;
    uncertainty:          Uncertainty;
}

export interface Emissions {
    co2: Co2;
    nox: Nox;
}

export interface Co2 {
    vehicleManufacturingG: number;
    vehicleMaintenanceG:   number;
    fuelProductionG:       number;
    totalLifecycleG:       number;
    tailpipeG:             number;
}

export interface Nox {
    tailpipeG: number;
}

export interface FuelConsumption {
    fuel:              string;
    fuelNameNorwegian: string;
    fuelName:          string;
    consumption:       number;
    consumptionKg:     number;
    unit:              string;
    co2G:              number;
    noxG:              number;
    fromHybrid:        boolean;
}

export interface Uncertainty {
    min: number;
    max: number;
}

export interface Source {
    vehicleId: string;
}
