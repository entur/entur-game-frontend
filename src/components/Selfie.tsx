import Webcam from 'react-webcam'
import React from 'react'
import { NegativeButton, SuccessButton } from '@entur/button'

type Props = {
    setShowSelfieModal: React.Dispatch<React.SetStateAction<boolean>>
}

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
}

export function Selfie({ setShowSelfieModal }: Props): JSX.Element {
    const webcamRef = React.useRef<Webcam>(null)
    const capture = React.useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot()
        }
    }, [webcamRef])

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>CHEEESE</h1>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <SuccessButton
                style={{ marginTop: '5px' }}
                onClick={() => {
                    capture()
                    setShowSelfieModal(false)
                }}
            >
                Ta bilde
            </SuccessButton>
            <NegativeButton
                style={{ marginTop: '5px' }}
                onClick={() => setShowSelfieModal(false)}
            >
                Lukk
            </NegativeButton>
        </div>
    )
}
