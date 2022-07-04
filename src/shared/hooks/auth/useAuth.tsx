import { setToLocalStorage } from "@/helper"
import { AuthorRes, loginParams, Register } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface Res {
  login: (params: loginParams, cb: (params: string) => void, err?: Function) => void
  register: (params: Register, cb: () => void, err?: Function) => void
}

export const useAuth = (shouldFetch = false): Res => {
  const dispatch = useDispatch()

  const login = async (params: loginParams, cb: (params: string) => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.login(params)
      dispatch(setScreenLoading(false))
      const token = res?.data?.token
      if (!res?.success || !token) {
        err && err()
        dispatch(notify(res?.message || "Đăng nhập không thành công", "error"))
        return
      }

      setToLocalStorage("access_token", token)
      cb(token)
      dispatch(notify("Đăng nhập thành công", "success"))
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const register = async (params: Register, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.register(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        err && err()
        dispatch(notify(res?.message || "Đăng ký không thành công", "error"))
        return
      }

      cb()
      dispatch(notify("Đăng ký thành công", "success"))
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  return {
    login,
    register,
  }
}
