import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import ImageUploading from 'react-images-uploading';

import './UserInfoForm.css';

function UserInfoForm({ viewingCurrentUserProfile, editInfoProp, updateInfo}) {
    const [avi, setAvi] = React.useState([]);
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setAvi(imageList);
    };
    return (
        <>
            {
                viewingCurrentUserProfile ?
                    <div className="userInfoForm">
                        {
                            editInfoProp ?
                                <div>
                                    <h2>Edit your information</h2>
                                    <form noValidate onSubmit={(e) => e.preventDefault()}>
                                        <ImageUploading
                                          value={avi}
                                          onChange={onChange}
                                          dataURLKey="data_url"
                                        >
                                            {({
                                                  imageList,
                                                  onImageUpload,
                                                  onImageUpdate,
                                                  onImageRemove,
                                                  isDragging,
                                                  dragProps,
                                                  errors,
                                              }) => (
                                              // write your building UI
                                              <div className="upload__image-wrapper">
                                                  <Button
                                                    style={isDragging ? { color: 'red' } : undefined}
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                  >
                                                      Upload or Drag Photo
                                                  </Button>
                                                  &nbsp;
                                                  {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image['data_url']} alt="" width="100" />
                                                        <div className="image-item__btn-wrapper">
                                                            <Button onClick={() => onImageUpdate(index)}>Update</Button>
                                                            <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                                        </div>
                                                    </div>
                                                  ))}
                                              </div>
                                            )}
                                        </ImageUploading>
                                        <TextField id="information " label="New information" onChange={event => console.log(event.target.value)}/>
                                    </form>
                                    <Button onClick={updateInfo}>Cancel</Button>
                                    <Button onClick={updateInfo}>Submit</Button>
                                </div>
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

export default UserInfoForm;
