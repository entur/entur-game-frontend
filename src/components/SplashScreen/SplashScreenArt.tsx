import React, { ReactElement } from 'react'
import ArtBoardCookie from '../../assets/images/ArtBoardCookie.png'
import ArtBoardOval from '../../assets/images/ArtBoardOval.png'
import ArtBoardCircle from '../../assets/images/ArtBoardCircle.png'

type BackgroundImage = {
    className?: string
}

export function SplashArtBoardCookieImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat h-80 w-96 ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCookie})` }}
        />
    )
}
export function SplashArtBoardOvalImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat h-72 w-72 ${className}`}
            style={{ backgroundImage: `url(${ArtBoardOval})` }}
        />
    )
}

export function SplashArtBoardCircleImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat h-80 w-96  ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCircle})` }}
        />
    )
}
