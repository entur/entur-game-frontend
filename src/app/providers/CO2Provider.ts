import { create } from 'zustand'
import { QueryMode } from '@entur/sdk'

export type CO2eLeg = {
    nsrList: string[]
    vehicleType: QueryMode | null
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
