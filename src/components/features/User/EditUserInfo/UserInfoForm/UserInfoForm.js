import React from 'react';
import ImageUploading from "react-images-uploading";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function UserInfoForm({toggleUpdateInfoForm, updateAvi}) {
  const [avi, setAvi] = React.useState([]);
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setAvi(imageList);
  };

  function clickedSubmit(e) {
    e.preventDefault();
    if (avi.length === 1) {
      // turn into blob and send mutation for adding to payload
      updateAvi(avi[0].file);
      toggleUpdateInfoForm();
    }
  }
  return (
    <div className='userInfoForm'>
      <h2>Edit your information</h2>
      <form noValidate onSubmit={(e) => clickedSubmit(e)}>
        <ImageUploading
          value={avi}
          onChange={onChange}
          dataURLKey="data_url"
          acceptType={['jpg','png']}
          maxFileSize={2000000}
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
              {
                errors &&
                <div>
                  {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                  {errors.acceptType && <span>Your selected file type is not allow</span>}
                  {errors.maxFileSize && <span>Please pick an image under 2 mb</span>}
                  {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                </div>
              }
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
        <Button onClick={toggleUpdateInfoForm}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </form>

    </div>
  );
}

export default UserInfoForm;
