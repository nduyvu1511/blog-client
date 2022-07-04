import { ImageUploadParams } from "@/models"
import axiosClient from "."

export const uploadApi = {
  uploadImage: (params: ImageUploadParams) => {
    return axiosClient.post("api/upload", params)
  },
}
