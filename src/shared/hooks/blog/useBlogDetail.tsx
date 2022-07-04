import { PostModel, PostRes, UpdatePostProps } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { postApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR, { KeyedMutator, SWRConfig } from "swr"

interface Res {
  isValidating: boolean
  data: PostRes | undefined
  deletePost: (blogId: string, cb: () => void, err?: Function) => void
  updatePost: (params: UpdatePostProps, cb: () => void, err?: Function) => void
  createPost: (params: PostModel, cb: () => void, err?: Function) => void
  mutate: (params: KeyedMutator<PostRes> | undefined) => void
}

export const useBlogDetail = (blogId?: string): Res => {
  const dispatch = useDispatch()
  const { data, isValidating, mutate } = useSWR<PostRes>(
    blogId ? "get_post_detail" : null,
    () =>
      postApi
        .getPostDetail(blogId + "")
        .then((res: any) => res?.data)
        .catch((err) => console.log(err)),
    {
      dedupingInterval: 1000,
      ...SWRConfig,
    }
  )

  const createPost = async (params: PostModel, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await postApi.createPost(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const updatePost = async (params: UpdatePostProps, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await postApi.updatePost(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const deletePost = async (blogId: string, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await postApi.deletePost(blogId)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  return {
    data,
    isValidating,
    deletePost,
    createPost,
    updatePost,
    mutate,
  }
}
