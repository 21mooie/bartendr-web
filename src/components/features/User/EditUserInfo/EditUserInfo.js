import React from 'react'
import Button from "@material-ui/core/Button";

import './EditUserInfo.css';
import UserInfoForm from "./UserInfoForm/UserInfoForm";

function EditUserInfo({ viewingCurrentUserProfile, editInfoProp, updateInfo}) {

    return (
        <>
            {
                viewingCurrentUserProfile ?
                    <div className="editUserInfo">
                        {
                            editInfoProp ?
                                <UserInfoForm updateInfo={updateInfo}/>
                            :
                                <Button onClick={updateInfo}>Edit info</Button>
                        }
                    </div>
                :
                    null
            }
        </>
    )
}

export default EditUserInfo;
