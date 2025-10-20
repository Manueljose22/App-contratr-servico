import React from 'react'
import { Alert, AlertDescription } from '../ui/alert'





export const AlertMessage = ({message}: {message: string | null}) => {
    return (
        <div className='my-2'>
            {message && (
                <Alert variant={"destructive"}>
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            )
            }
        </div>
    )
}
