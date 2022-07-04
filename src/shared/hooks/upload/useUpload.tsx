import { ImageUploadParams, ImageUploadRes } from "@/models"
import { uploadApi } from "@/services"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface UseUploadAttachmentRes {
  isUploading: boolean
  uploadImage: (
    params: ImageUploadParams,
    cb: (params: ImageUploadRes) => void,
    onErr?: Function
  ) => void
}

const useUploadAttachment = (): UseUploadAttachmentRes => {
  const dispatch = useDispatch()
  const [isUploading, setUploading] = useState<boolean>(false)

  const uploadImage = async (
    params: ImageUploadParams,
    cb: (params: ImageUploadRes) => void,
    onErr?: Function
  ) => {
    try {
      setUploading(true)
      const res: any = await uploadApi.uploadImage(params)
      setUploading(false)
      console.log(res.success)
      if (!res?.success) {
        onErr && onErr()
        dispatch(notify("Có lỗi khi tải hình, vui lòng thử lại", "error"))
        return
      }
      cb(res?.data)
    } catch (error) {
      dispatch(notify("Có lỗi khi tải hình, vui lòng thử lại", "error"))
      onErr && onErr()
      setUploading(false)
    }
  }

  return { isUploading, uploadImage }
}

export { useUploadAttachment }
