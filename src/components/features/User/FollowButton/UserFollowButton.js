import React from 'react'
import { Button } from '@material-ui/core'

import './UserFollowButton.css';

function UserFollowButton({viewingCurrentUserProfile}) {
    return (
        <div className='userFollowButton'>
            {
                viewingCurrentUserProfile ?
                    null
                :
                    <Button>Follow</Button>
            }
        </div>
    )
}

export default UserFollowButton
