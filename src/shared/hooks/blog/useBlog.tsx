import { FilterBlogParams, PostModel, PostRes, UpdatePostProps } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { postApi } from "@/services"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  data: PostRes[]
  loadingMore: boolean
  hasMore: boolean
  fetchMoreBlogs: () => void
  deletePost: (postId: string, cb: () => void, err?: Function) => void
  updatePost: (params: UpdatePostProps, cb: () => void, err?: Function) => void
  createPost: (params: PostModel, cb: () => void, err?: Function) => void
  filterBlogs: (params: FilterBlogParams) => void
}

const LIMIT = 12

export const useBlog = (shouldFetch = false): Res => {
  const dispatch = useDispatch()
  const { data, isValidating, mutate } = useSWR<PostRes[]>(
    "get_post_list",
    shouldFetch
      ? () =>
          postApi
            .getPosts({ limit: LIMIT, offset: 0 })
            .then((res: any) => {
              const list = res?.data || []
              checkHasMore(list?.length || 0)
              return res?.data || []
            })
            .catch((err) => console.log(err))
      : null,
    {
      dedupingInterval: 2000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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
      mutate()
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

  const deletePost = async (postId: string, cb: () => void, err?: Function) => {
    try {
      if (!data?.length) return
      dispatch(setScreenLoading(true))
      const res: any = await postApi.deletePost(postId)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      cb()
      mutate(
        [...data].filter((item) => item.postId !== postId),
        false
      )
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const fetchMoreBlogs = async () => {
    try {
      setLoadingMore(true)
      const res: any = await postApi.getPosts({ limit: LIMIT, offset: offset + LIMIT })
      setLoadingMore(false)
      setOffset(offset + LIMIT)
      const list = res?.data || []
      checkHasMore(list?.length || 0)
      mutate([...(data || []), ...(res?.data || [])], false)
    } catch (error) {
      setLoadingMore(false)
      console.log(error)
    }
  }

  const checkHasMore = (length: number) => {
    if (length < LIMIT) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }

  const filterBlogs = async (params: FilterBlogParams) => {
    try {
      setLoading(true)
      const res: any = await postApi.getPosts({ ...params, offset: 0 })
      setLoading(false)
      setOffset(offset + LIMIT)
      const list = res?.data || []
      checkHasMore(list?.length || 0)
      mutate(list, false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return {
    data: data || [],
    isValidating: isValidating || loading,
    hasMore,
    fetchMoreBlogs,
    deletePost,
    loadingMore,
    createPost,
    updatePost,
    filterBlogs,
  }
}
