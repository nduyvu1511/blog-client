import { ChangePasswordParams, loginParams, ProfileFormParams, Register } from "@/models"
import axiosClient from "."

export const userApi = {
  register: (params: Register) => {
    return axiosClient.post("/api/auth/register", params)
  },
  login: (params: loginParams) => {
    return axiosClient.post("/api/auth/login", params)
  },
  changePassword: (params: ChangePasswordParams) => {
    return axiosClient.post("/api/auth/change_password", params)
  },
  getProfile: () => {
    return axiosClient.get("/api/author/profile")
  },
  updateProfile: (params: ProfileFormParams) => {
    return axiosClient.post("/api/author/update_profile", params)
  },
}
