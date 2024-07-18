'use client'

import { ToastProvider } from '@entur/alert'
import { ReactNode } from 'react'

export function EnturToastProvider({ children }: { children: ReactNode }) {
    return <ToastProvider>{children}</ToastProvider>
}
