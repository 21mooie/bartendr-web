import React from 'react'
import Button from "@material-ui/core/Button";

import './EditUserInfo.css';
import UserInfoForm from "./UserInfoForm/UserInfoForm";

function EditUserInfo({ viewingCurrentUserProfile, editInfoProp, toggleUpdateInfoForm, updateAvi}) {

    return (
        <>
            {
                viewingCurrentUserProfile ?
                    <div className="editUserInfo">
                        {
                            editInfoProp ?
                                <UserInfoForm toggleUpdateInfoForm={toggleUpdateInfoForm} updateAvi={updateAvi}/>
                            :
                                <Button onClick={toggleUpdateInfoForm}>Edit info</Button>
                        }
                    </div>
                :
                    null
            }
        </>
    )
}

export default EditUserInfo;
