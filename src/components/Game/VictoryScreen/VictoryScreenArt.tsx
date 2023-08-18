import React, { ReactElement } from 'react'
import ArtBoardCookie from '../../../assets/images/ArtBoardCookie.png'
import ArtBoardOval from '../../../assets/images/ArtBoardOval.png'
import ArtBoardCircle from '../../../assets/images/ArtBoardCircle.png'

type BackgroundImage = {
    className?: string
}

export function VictoryArtBoardCookieImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat bg-contain h-[38rem] w-[38rem] ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCookie})` }}
        />
    )
}
export function VictoryArtBoardOvalImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat bg-contain h-[36rem] w-[38rem] ${className}`}
            style={{ backgroundImage: `url(${ArtBoardOval})` }}
        />
    )
}

export function VictoryArtBoardCircleImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat bg-contain h-[40rem] w-[36rem]  ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCircle})` }}
        />
    )
}
