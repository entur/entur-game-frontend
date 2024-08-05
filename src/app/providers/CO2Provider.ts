import { create } from 'zustand'
import { SintefVehicle } from '@/lib/types/emissionsResponse'

export type CO2eLeg = {
    route: {
        StopIds: string[]
    }
    vehicle: SintefVehicle
}

type CO2State = {
    co2eLegs: CO2eLeg[]
    addLeg: (leg: CO2eLeg) => void
    removeAllLegs: () => void
}

export const useCO2State = create<CO2State>((set) => ({
    co2eLegs: [],
    addLeg: (leg) => set((state) => ({ co2eLegs: [...state.co2eLegs, leg] })),
    removeAllLegs: () => set({ co2eLegs: [] }),
}))
