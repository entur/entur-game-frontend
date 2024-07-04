import React, { ReactElement } from 'react'
import ArtBoardCookie from '@/lib/assets/images/ArtBoardCookie.png'
import ArtBoardOval from '@/lib/assets/images/ArtBoardOval.png'
import ArtBoardCircle from '@/lib/assets/images/ArtBoardCircle.png'
import Image from "next/image";

type BackgroundImage = {
    className?: string
}

export function SplashArtBoardCookieImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div className={`bg-no-repeat h-80 w-96 ${className}`}>
        <Image
            src={ArtBoardCookie}
            alt="ArtBoardCookie"
        />
        </div>
    )
}
export function SplashArtBoardOvalImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div className={`bg-no-repeat h-72 w-72 ${className}`}>
        <Image
            src={ArtBoardOval}
            alt="ArtBoardOval"
        />
        </div>
    )
}

export function SplashArtBoardCircleImage({
    className,
}: BackgroundImage): ReactElement {
    return (
        <div className={`bg-no-repeat h-80 w-96  ${className}`}>

        <Image
            src={ArtBoardCircle}
            alt={"ArtBoardCircle"}
        />
        </div>
    )
}
