"use client"

import { Heading3, Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { Loader } from '@entur/loader'
import {
    SplashArtBoardCircleImage,
    SplashArtBoardCookieImage,
    SplashArtBoardOvalImage,
} from './SplashScreenArt'
import EnInsertTur from '../EnInsertTur'
import {useRouter} from "next/navigation";
import {getActiveGameModeEvent} from "@/lib/api/gameModeApi";
import useSWR from "swr";
import Image from "next/image";
import EnturPartnerIconLight from "@/lib/assets/icons/EnturPartnerLight.svg";
import Link from "next/link";

export function SplashScreen(): JSX.Element {
    const router = useRouter()
    const { data: activeGameMode } = useSWR('/game-mode/active-event', () =>
        getActiveGameModeEvent(),
    )
    if (activeGameMode === undefined) {
        return <Loader>Laster inn...</Loader>
    }
    return (
        <>
            <Link href="/" className="pt-10 ml-5 mr-20">
                <Image
                    className="cursor-pointer"
                    src={EnturPartnerIconLight}
                    alt="entur partner"
                />
            </Link>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <SplashArtBoardOvalImage className="absolute sm:-top-72 sm:left-10 -top-64"/>
                <SplashArtBoardCookieImage className="absolute right-[24rem] sm:bottom-12 bottom-20"/>
                <SplashArtBoardCircleImage className="absolute bottom-32 right-[-19rem]"/>
                <div className="flex flex-col justify-center place-item-center z-10">
                    <div className="relative flex flex-row place-items-center space-x-5 justify-center items-center">
                        <EnInsertTur/>
                    </div>
                    <div className="flex flex-col place-items-center mt-24 z-10 sm:mr-10">
                        <Heading3 className="text-white font-normal" margin="none">
                            Velkommen om bord!
                        </Heading3>
                        <Paragraph className="text-white max-w-md text-center font-normal">
                            Er du smartere enn vår reiseplanlegger? Bli med på og
                            vinn gratis kollektivreiser!
                        </Paragraph>
                        <div className="w-80">
                            <Button
                                className="font-semibold w-full"
                                onClick={() => router.push(`/game/${activeGameMode?.difficulty}`)}
                                variant="success"
                            >
                                Kjør!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashScreen
