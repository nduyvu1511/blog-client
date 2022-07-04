import { SpinnerIcon, UploadIcon } from "@/assets"
import { useAttachment, useUploadAttachment } from "@/hooks"
import { ImageUploadFolder, ImageUploadRes } from "@/models"
import Image from "next/image"
import { ChangeEvent } from "react"

interface ImageFileProps {
  getImage?: (params: ImageUploadRes) => void
  isError?: boolean
  image?: string | undefined
  id: string
  folder: ImageUploadFolder
}

export const ImageSingleFile = ({ getImage, isError, image, id, folder }: ImageFileProps) => {
  const { isUploading, uploadImage } = useUploadAttachment()
  const { getBase64Images } = useAttachment({
    limit: 1,
    useState: false,
  })

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    getBase64Images(files, (imgs) => {
      if (!imgs?.[0]) return
      const image = imgs?.[0] || ""
      if (!image) return

      const btnDOM = document.querySelector(".form-upload-btn")
      const labelImage = document.querySelector(`.file-image-picker-${id}`)
      labelImage?.classList.remove("form-input-err")
      btnDOM?.classList.add("btn-disabled-2")

      uploadImage(
        { base64Str: image, folder },
        (val) => {
          btnDOM?.classList.remove("btn-disabled-2")
          getImage && getImage(val)
        },
        () => {
          btnDOM?.classList.remove("btn-disabled-2")
          labelImage?.classList.add("form-input-err")
        }
      )
    })
  }

  return (
    <div
      className="flex-center flex-col"
      style={{
        pointerEvents: isUploading ? "none" : "unset",
        userSelect: "none",
      }}
    >
      <input onChange={handleUploadImage} id={id} hidden type="file" name="" accept="image/*" />
      <label
        htmlFor={id}
        className={`flex-center flex-col h-[100px] overflow-hidden w-[148px] rounded-[5px] border-2 border-dashed ${
          isError ? "border-error" : "border-gray-color-2"
        } cursor-pointer relative flex-center file-image-picker mb-[4px] ${
          image && !isUploading ? "border-none" : ""
        } ${isError ? "form-input-err" : ""} file-image-picker-${id}`}
      >
        {isUploading ? (
          <span className="absolute inset-0 w-full h-full flex-center bg-gray-color-1 z-[100]">
            <SpinnerIcon className="animate-spin w-[18px] h-[18px]" />
          </span>
        ) : null}

        <UploadIcon className="text-gray-color-3" />
        <label className="text-gray-color-2 text-12 font-normal" htmlFor={id}>
          {image ? "Thay đổi hình ảnh" : "Tải ảnh lên"}
        </label>

        {image ? (
          <Image className="z-10 absolute" src={image} alt="" layout="fill" objectFit="cover" />
        ) : null}
      </label>
    </div>
  )
}
