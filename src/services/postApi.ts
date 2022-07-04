import axiosClient from "."
import {
  FilterBlogParams,
  getPostsByCategoryParams,
  ListParams,
  PostModel,
  UpdatePostProps,
} from "@/models"

export const postApi = {
  createPost: (params: PostModel) => {
    return axiosClient.post("/api/post/add", params)
  },
  deletePost: (postId: string) => {
    return axiosClient.post("/api/post/delete", { postId })
  },
  restorePost: (postId: string) => {
    return axiosClient.post("/api/post/restore", { postId })
  },
  updatePost: (params: UpdatePostProps) => {
    return axiosClient.post("/api/post/update", params)
  },
  getPosts: ({ limit = 12, categoryId = "", offset = 0 }: FilterBlogParams) => {
    return axiosClient.get(`/api/post?limit=${limit}&offset=${offset}&categoryId=${categoryId}`)
  },
  getPostsByCategory: ({ limit = 12, offset = 0, categoryId }: getPostsByCategoryParams) => {
    return axiosClient.get(`/api/post/category/${categoryId}?limit=${limit}&offset=${offset}`)
  },
  getPostDetail: (postId: string) => {
    return axiosClient.get(`/api/post/${postId}`)
  },
}
