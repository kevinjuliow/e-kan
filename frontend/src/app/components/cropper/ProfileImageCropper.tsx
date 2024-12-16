import React, { SyntheticEvent, useRef, useState } from 'react'
import { XMarkNonSolidIcon } from '../icon';
import "react-image-crop/dist/ReactCrop.css" 
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, PercentCrop } from 'react-image-crop';
import setCanvasImage from './SetCanvasImage';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface ProfileImageCropperProps {
  // updateProductImage: (imageSource: string | undefined) => void;
  handleToast: (message: string, toastType: string) => void;
  closeCropperWindow: () => void;
  onRefetch: () => void;
}

// Constant value for ReactCrop property value
const ASPECT_RATIO = 1/1;
const MIN_WIDTH_DIMENSION = 100;
const MIN_HEIGHT_DIMENSION = 100;
const MAX_FILE_SIZE = 1.5 * 1024 * 1024 // 1.5 MB in bytes

const ProfileImageCropper: React.FC<ProfileImageCropperProps> = ({ handleToast, closeCropperWindow, onRefetch }) => {
  const { data: session } = useSession()
  const imageRef = useRef<HTMLImageElement | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const [imageSource, setImageSource] = useState<string>("")
  const [crop, setCrop] = useState<PercentCrop>()
  const [error, setError] = useState<string>("")

  const handleOnSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] // Takes the image from input
    if (!file) { // Check if theres any file inputted
      return
    }

    // Validate the size of the file
    if (file.size > MAX_FILE_SIZE) {
      setError("Ukuran file tidak boleh lebih dari 2 MB")
      setImageSource("")
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    // This function below will fire when the image is fully loaded into the file reader
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || ""

      // create an image object to validate the invalid pixel size of inputted image
      const image = new Image() 
      image.src = imageUrl

      image.addEventListener("load", (e: Event) => {
        const{ naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement
        // rejects the invalid pixel size of inputted image
        if (naturalWidth < MIN_WIDTH_DIMENSION || naturalHeight < MIN_HEIGHT_DIMENSION) {
          setError("Ukuran gambar yang dimasukkan tidak sesuai ketentuan!")
          setImageSource("")
          return
        }
        setError("")
      })

      setImageSource(imageUrl)
    })
    reader.readAsDataURL(file) // It triggers the read reader to start reading the file
  }

  // When the function below is run, we want to set the crop state to the crop object
  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    // natural is the original size of the image and not natural is the current size of displayed image
    const{
      // width, height,
      naturalWidth, naturalHeight
    } = e.currentTarget
    
    const crop = makeAspectCrop({
        unit: "%",
        width: 50, // it means 25 percents
      },
      ASPECT_RATIO,
      naturalWidth,
      naturalHeight
    )

    // this centeredCrop will makes the default cropping image area in the center of the image
    const centeredCrop = centerCrop(crop, naturalWidth, naturalHeight)
    setCrop(centeredCrop)
  }

  const handleUpdateImage = async (onSuccess: () => void) => {
    if (!previewCanvasRef.current) {
      console.error("Canvas is empty!");
      return;
    }
  
    // Konversi hasil crop pada canvas ke Blob
    previewCanvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        return
      }
  
      // Make file from blob
      const imageFile = new File([blob], "cropped-image.jpg", { type: "image/jpeg" });
      const formDataImage = new FormData();
      formDataImage.append("file", imageFile);
  
      try {
        await axios.post(`${process.env.API_BASEURL}/api/profile-picture`, formDataImage, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
  
        handleToast("Berhasil melakukan update gambar profil!", "SUCCESS")
        onSuccess() // Close the update image form
        onRefetch()
      } catch (error) {
        console.error("Failed to upload image:", error)
        handleToast("Gagal melakukan update gambar profil, coba lagi!", "WARNING")
      }
    }, "image/jpeg")
  }

  return (
    <div className="fixed w-[85%] h-[85%] mt-[5%] p-4 rounded-lg flex flex-col items-center justify-start backdrop-blur-md bg-opacity-75 bg-white z-[60]">
      <h1 className="text-2xl font-bold mt-20 md:mt-12 text-center">Pilih Gambar untuk Profil Anda!</h1>
      
      <div className="mt-4">
        <div className="flex flex-col items-center justify-center">
          <input
            className="p-2 block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleOnSelectedFile}  
          />
          <p className="mt-2 text-sm" id="file_input_help">{`Minimal ukuran gambar adalah ${MIN_WIDTH_DIMENSION}x${MIN_HEIGHT_DIMENSION} pixels`}</p>
          <p className="mt-0 text-sm" id="file_input_help">{`Maksimal ukuran file gambar adalah ${MAX_FILE_SIZE / 1024 / 1024} MB`}</p>
        </div>
      </div>

      {imageSource && 
      <div className="mt-6 flex items-center justify-center border-4 border-lightaqua">
        <ReactCrop 
          crop={crop}
          keepSelection={true}
          aspect={ASPECT_RATIO}
          minWidth={MIN_WIDTH_DIMENSION}
          circularCrop
          onChange={
            (_, percentCrop) => setCrop(percentCrop)
          }
        >
          <img
            ref={imageRef}
            src={imageSource}
            alt="uploaded gambar produk"
            style={{ maxHeight: '20rem' }}
            onLoad={onImageLoad} // it will run only once the image is loaded successfully
          />
        </ReactCrop>
      </div>}
      
      {imageSource &&
        <button
          onClick={() => {
            if (crop && imageRef.current && previewCanvasRef.current) {
              // Set hasil cropping pada canvas
              setCanvasImage(
                imageRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imageRef.current.width,
                  imageRef.current.height
                )
              );
        
              handleUpdateImage(() => {
                closeCropperWindow();
              });
            } else {
              console.error("Image cropping is not set or canvas is unavailable");
            }
          }}
          className="w-full md:w-24 border mt-4 px-5 py-2.5 custom-hover-button cursor-pointer rounded-md bg-darkaqua text-white border-none text-sm">
          OK
        </button>
      }

      {crop && <canvas ref={previewCanvasRef} className="hidden absolute top-4 left-4 border border-red-500" />}

      {error && <p className="text-red-500 mt-12 px-2 py-1">{error}</p>}

      <div onClick={closeCropperWindow} className="flex items-center justify-center border border-gray-800 px-1 py-1 rounded-lg absolute top-0 right-0 m-4 cursor-pointer">
        {/* <p className="relative top-[1px]">Batal</p> */}
        <XMarkNonSolidIcon size={24} hexColor={"#1f2937"} />
      </div>
    </div>
  )
}

export default ProfileImageCropper