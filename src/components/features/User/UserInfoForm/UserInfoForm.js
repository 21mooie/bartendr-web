import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import './UserInfoForm.css';

function UserInfoForm({ viewingCurrentUserProfile, editInfoProp, setEditInfoProp}) {
    return (
        <>
            {
                viewingCurrentUserProfile ?
                    <div className="userInfoForm">
                        {
                            editInfoProp ?
                                <div>
                                    <h2>Edit your information</h2>
                                    <form noValidate autoComplete="off">
                                    <TextField id="information " label="New information" onChange={event => console.log(event.target.value)}/>
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

export default UserInfoForm;
