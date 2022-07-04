import { ChangePasswordParams } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

interface Res {
  changePassword: (params: ChangePasswordParams, cb: () => void, err?: Function) => void
}

export const usePassword = (): Res => {
  const dispatch = useDispatch()

  const changePassword = async (params: ChangePasswordParams, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.changePassword(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Cập nhật không thành công", "error"))
        err && err()
        return
      }
      dispatch(notify(res?.message || "Đổi mật khẩu thành công", "success"))
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  return {
    changePassword,
  }
}
