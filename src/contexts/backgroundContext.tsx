import React, { createContext, useContext, useState, ReactElement } from 'react'

type BackgroundContextType = {
    backgroundColor: string
    setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
    undefined,
)

type Props = {
    children: ReactElement
}

export const BackgroundProvider = ({ children }: Props): ReactElement => {
    const [backgroundColor, setBackgroundColor] = useState('bg-blue-main')

    return (
        <BackgroundContext.Provider
            value={{ backgroundColor, setBackgroundColor }}
        >
            {children}
        </BackgroundContext.Provider>
    )
}

export const useBackground = (): BackgroundContextType => {
    const context = useContext(BackgroundContext)
    if (!context) {
        throw new Error('ERRRRROOOOOOOOOOOORRRRRRRR')
    }
    return context
}
