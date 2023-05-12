import React, {useEffect, useRef, useState} from 'react';
import ImageUploading from "react-images-uploading";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function UserInfoForm({toggleUpdateInfoForm, updateAvi}) {
  const [upload, setUpload] = useState(null);
  const [avi, setAvi] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 300,
    height: 300
  });
  const [completedCrop, setCompletedCrop] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const blobUrlRef = useRef('');
  const hiddenAnchorRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        )
      }
    },100);

    if(avi){
      console.log('avi ', avi);
      console.log('upload ', upload);
      updateAvi(avi);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCrop, avi, upload]);

  function canvasPreview(
    image,
    canvas,
    crop,
    scale = 1,
    rotate = 0,
  ) {
    const ctx = canvas.getContext('2d')
  
    if (!ctx) {
      throw new Error('No 2d context')
    }
  
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    // devicePixelRatio slightly increases sharpness on retina devices
    // at the expense of slightly slower render times and needing to
    // size the image back down if you want to download/upload and be
    // true to the images natural size.
    const pixelRatio = window.devicePixelRatio
    // const pixelRatio = 1
  
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
  
    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'
  
    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY
  
    const rotateRads = rotate * Math.PI / 180
    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2
  
    ctx.save()
  
    // 5) Move the crop origin to the canvas origin (0,0)
    ctx.translate(-cropX, -cropY)
    // 4) Move the origin to the center of the original position
    ctx.translate(centerX, centerY)
    // 3) Rotate around the origin
    ctx.rotate(rotateRads)
    // 2) Scale the image
    ctx.scale(scale, scale)
    // 1) Move the center of the image to the origin (0,0)
    ctx.translate(-centerX, -centerY)
    ctx.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
    )
  
    ctx.restore()
  }

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log('imagelist ', imageList);
    setUpload(imageList[0]);
  };

  function clickedSubmit(e) {
    e.preventDefault();
    if (completedCrop) {
      // turn into blob and send mutation for adding to payload
      console.log(completedCrop);
      previewCanvasRef.current.toBlob((blob) => {
        setAvi(blob);
      });
    }
  }

  return (
    <div className='userInfoForm'>
      <h2>Edit your information</h2>
      <form noValidate onSubmit={(e) => clickedSubmit(e)}>
        <ImageUploading
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

        {
          upload &&
          <ReactCrop
            crop={crop} 
            onChange={c => setCrop(c)} 
            onComplete={(c) => setCompletedCrop(c)}
            circularCrop={true}
            locked={true}
            maxWidth="300"
            maxHeight="300"
          >
            <img 
              src={upload.data_url}
              alt="Uncropped Preview"
              style={{maxWidth: 700 }}
              ref={imgRef}
            />
          </ReactCrop>
        }
        <TextField id="information " label="New information" onChange={event => console.log(event.target.value)}/>
        <Button onClick={toggleUpdateInfoForm}>Cancel</Button>
        <Button type="submit">Submit</Button>
        {
          !!completedCrop &&
          <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
            width: completedCrop.width,
            height: completedCrop.height,
          }}
        />
        }
        
      </form>

    </div>
  );
}

export default UserInfoForm;
