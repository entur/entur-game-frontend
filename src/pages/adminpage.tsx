import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@entur/form';
import { SuccessButton } from '@entur/button';
import { Heading1 } from '@entur/typography';
import { ForwardIcon } from '@entur/icons';
import { Contrast } from '@entur/layout';

export function AdminPage(): JSX.Element {
    // må legge inn funksjonelitet for å hente fra API
    const navigate = useNavigate();

    return (
        <div className='max-w-md mx-auto p-4'>
            <Contrast>
                <Heading1>
                    Admin Panel
                </Heading1>
                <div className="space-y-10 mt-10">
                    <TextField size="medium" label="Start" variant="information"></TextField>
                    <TextField size="medium" label="Stopp" variant="information"></TextField>
                    <SuccessButton onClick={() => navigate('/')}> <ForwardIcon /></SuccessButton> 
                </div>
               
            </Contrast> 
        </div>
    );
}