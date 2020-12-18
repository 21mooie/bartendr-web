import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import './UserInfoForm';

function UserInfoForm({ viewingCurrentUserProfile, editInfoProp, setEditInfoProp, setUsernameProp}) {
    return (
        <>
            {
                viewingCurrentUserProfile ?
                    <div className="userInfoForm">
                        {
                            editInfoProp ?
                                <div>
                                    <h2>Change your username here</h2>
                                    <form noValidate autoComplete="off">
                                    <TextField id="newUsername " label="New Username" onChange={event => setUsernameProp(event.target.value)}/>
                                    </form>
                                    <Button onClick={() => {setEditInfoProp(!editInfoProp)}}>Cancel</Button>
                                    <Button onClick={() => {setEditInfoProp(!editInfoProp)}}>Submit</Button>
                                </div>
                            :
                                <Button onClick={() => {setEditInfoProp(!editInfoProp)}}>Edit info</Button>
                        }
                    </div>
                :
                    null
            }
        </>
    )
}

export default UserInfoForm
