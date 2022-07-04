import { convertBase64 } from "@/helper"
import _ from "lodash"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface UseAttachmentRes {
  getBase64Images: (files: FileList, callback?: (props: Array<string>) => void) => void
  deleteImage: (props: string) => void
  images: Array<string> | undefined
  setImages: (props: Array<string> | undefined) => void
  deleteImages: (props: Array<string>) => void
}

interface UseAttachmentProps {
  limit: number
  initImages?: Array<string>
  useState?: boolean
}

const useAttachment = (props: UseAttachmentProps): UseAttachmentRes => {
  const { limit, initImages, useState: useStateProps = true } = props
  const dispatch = useDispatch()

  const [images, setImages] = useState<Array<string> | undefined>(
    initImages && initImages?.length > 0 ? initImages : undefined
  )

  const getBase64Images = async (
    files: FileList,
    callback?: (props: Array<string>) => void,
    handleError?: Function
  ) => {
    if (limit < 1) return
    try {
      const urls: any = await Promise.all(
        Array.from(files).map(async (item: File) => {
          return await convertBase64(item)
        })
      )

      if (!urls?.length) {
        handleError && handleError()
        dispatch(notify(`Có lỗi khi chọn ảnh, vui lòng thử lại`, "error"))
        return
      }

      if (limit === 1) {
        useStateProps && setImages([urls?.[0] || ""])
        callback && callback(urls)
        return
      }

      if (files?.length > limit || (files?.length || 0) + (images?.length || 0) > limit) {
        dispatch(notify(`Số lượng ảnh chọn không được vượt quá ${limit} ảnh!`, "error"))
        return
      }

      if (!images) {
        useStateProps && setImages(urls)
        callback && callback(urls)
      } else {
        const newUrls = _.uniq([...urls, ...images])
        useStateProps && setImages(newUrls)
        callback && callback(newUrls)
      }
    } catch (error) {
      handleError && handleError()
      console.log(error)
    }
  }

  const deleteImages = (urls: Array<string>) => {
    if (images) {
      const newImages = [...urls].filter((item) => images?.some((x) => x === item))

      useStateProps && setImages(newImages?.length > 0 ? newImages : undefined)
    } else {
      useStateProps && setImages(undefined)
    }
  }

  const deleteImage = (url: string) => {
    if (images) {
      const newImages = [...images].filter((item) => item !== url)
      useStateProps && setImages(newImages?.length > 0 ? newImages : undefined)
    }
  }

  return {
    deleteImage,
    getBase64Images,
    images,
    setImages,
    deleteImages,
  }
}

export { useAttachment }
