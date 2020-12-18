import React from 'react'
import { Button } from '@material-ui/core'

function FollowButton({viewingCurrentUserProfile}) {
    return (
        <>
            {
                viewingCurrentUserProfile ?
                    null
                :
                    <Button>Follow</Button>
            }
        </>
    )
}

export default FollowButton
