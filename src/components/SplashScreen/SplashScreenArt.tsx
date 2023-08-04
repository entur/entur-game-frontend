import React, { ReactElement } from 'react'
import ArtBoardCookie from '../../assets/images/ArtBoardCookie.png'
import ArtBoardOval from '../../assets/images/ArtBoardOval.png'
import ArtBoardCircle from '../../assets/images/ArtBoardCircle.png'

type BackgroundImage = {
    className?: string
}

export function ArtBoardCookieImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat h-80 w-96 ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCookie})` }}
        />
    )
}
export function ArtBoardOvalImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            // className={`bg-no-repeat h-80 w-96 ${className}`}
            className={`bg-no-repeat h-72 w-72 ${className}`}
            style={{ backgroundImage: `url(${ArtBoardOval})` }}
        />
    )
}

export function ArtBoardCircleImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div
            className={`bg-no-repeat h-80 w-96  ${className}`}
            style={{ backgroundImage: `url(${ArtBoardCircle})` }}
        />
    )
}
