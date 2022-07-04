import { CategoryModel, CategoryOptions, CategoryRes, UpdateCategoryParams } from "@/models"
import { setScreenLoading } from "@/modules/commonSlice"
import { categoryApi } from "@/services"
import { useDispatch } from "react-redux"
import { notify } from "reapop"
import useSWR from "swr"

interface Res {
  isValidating: boolean
  data: CategoryRes[]
  deleteCategory: (postId: string, cb: () => void, err?: Function) => void
  updateCategory: (params: UpdateCategoryParams, cb: () => void, err?: Function) => void
  createCategory: (params: CategoryModel, cb: () => void, err?: Function) => void
  getCategoryOptions: (cb: (params: CategoryOptions[]) => void, err?: Function) => void
}

export const useCategory = (shouldFetch = false): Res => {
  const dispatch = useDispatch()
  const { data, isValidating, mutate } = useSWR<CategoryRes[]>(
    "get_category_list",
    shouldFetch
      ? () =>
          categoryApi
            .getCategoryList()
            .then((res: any) => res?.data || [])
            .catch((err) => console.log(err))
      : null,
    {
      dedupingInterval: 20000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const createCategory = async (params: CategoryModel, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await categoryApi.createCategory(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      mutate([...(data || []), res?.data], false)
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const getCategoryOptions = async (cb: (params: CategoryOptions[]) => void, err?: Function) => {
    try {
      const res: any = await categoryApi.getCategoryOptions()
      if (!res?.success) {
        err && err()
        return
      }
      cb(res?.data || [])
    } catch (error) {
      err && err()
    }
  }

  const updateCategory = async (params: UpdateCategoryParams, cb: () => void, err?: Function) => {
    try {
      dispatch(setScreenLoading(true))
      const res: any = await categoryApi.updateCategory(params)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      if (!data?.length) return
      mutate(
        [...data].map((item) =>
          item.categoryId === params.categoryId
            ? {
                ...item,
                desc: params?.desc || "",
                image: params?.image || "",
                slug: params?.slug || "",
                name: params.name,
                parentId: params?.parentId || "",
              }
            : item
        ),
        false
      )
      cb()
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  const deleteCategory = async (categoryId: string, cb: () => void, err?: Function) => {
    try {
      if (!data?.length) return
      dispatch(setScreenLoading(true))
      const res: any = await categoryApi.deleteCategory(categoryId)
      dispatch(setScreenLoading(false))
      if (!res?.success) {
        dispatch(notify(res?.message || "Có lỗi khi tạo bài đăng", "error"))
        err && err()
        return
      }
      cb()
      mutate(
        [...data].filter((item) => item.categoryId !== categoryId),
        false
      )
    } catch (error) {
      dispatch(setScreenLoading(false))
      err && err()
    }
  }

  return {
    data: data || [],
    isValidating,
    deleteCategory,
    updateCategory,
    createCategory,
    getCategoryOptions,
  }
}
