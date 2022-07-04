import { AuthorRes, ProfileFormParams } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { setProfile } from "@/modules/profileSlice"
import { userApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  data: AuthorRes | undefined
  updateProfile: (
    params: ProfileFormParams,
    cb: (params: AuthorRes) => void,
    err?: Function
  ) => void
}

export const UseProfile = (shouldFetch = false): Res => {
  const dispatch = useDispatch()
  const { data, isValidating, mutate } = useSWR<AuthorRes>(
    "get_profile",
    shouldFetch
      ? () =>
          userApi
            .getProfile()
            .then((res: any) => {
              const profile = res?.data
              dispatch(setProfile(profile))
              return profile
            })
            .catch((err) => console.log(err))
      : null,
    {
      dedupingInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const updateProfile = async (
    params: ProfileFormParams,
    cb: (params: AuthorRes) => void,
    err?: Function
  ) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await userApi.updateProfile(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Cập nhật không thành công", "error"))
        err && err()
        return
      }
      dispatch(notify("Cập nhật thành công", "success"))
      dispatch(setProfile(res?.data))
      cb(res?.data)
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  return {
    data,
    isValidating,
    updateProfile,
  }
}
