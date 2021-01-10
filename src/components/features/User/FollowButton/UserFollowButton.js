import React from 'react'
import { Button } from '@material-ui/core'

import './UserFollowButton.css';

function UserFollowButton({viewingCurrentUserProfile, alreadyFollowing, updateFollowing}) {
    return (
        <div className='userFollowButton'>
            {
                viewingCurrentUserProfile ?
                    null
                :
                    <Button onClick={updateFollowing}>
                        {
                            alreadyFollowing ?
                              <>Unfollow</>
                            :
                              <>Follow</>
                        }
                    </Button>
            }
        </div>
    )
}

export default UserFollowButton
