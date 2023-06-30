import './SplashScreen.css'
import { Paragraph } from '@entur/typography'
import { Button } from '@entur/button'
import { useNavigate } from 'react-router-dom';
export function SplashScreen(): JSX.Element {
    const navigate = useNavigate();
    return (
        <>
            <div id='illustration1' />
            <div id='illustration2' />
            <div id='illustration3' />
            <div id='centertext'>
                <Paragraph id='en'>EN</Paragraph>
                <Paragraph id='middels'>MIDDELS</Paragraph>
                <Paragraph id='tur'>TUR</Paragraph>
            </div>
            <div id='infotext'>
                <Paragraph margin='none' id='welcometext'>Velkommen om bord!</Paragraph>
                <Paragraph id='questiontext'>Er du smartere enn vår reiseplanlegger? Bli med på turen og vinn gratis kollektivreiser!</Paragraph>
            </div>
            <Button onClick={() => navigate("/")} variant={'success'}>Kjør!</Button>

        </>
    )
}

export default SplashScreen
