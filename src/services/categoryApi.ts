import { CategoryModel } from "@/models"
import axiosClient from "."

export const categoryApi = {
  createCategory: (params: CategoryModel) => {
    return axiosClient.post("/api/category/add", params)
  },
  updateCategory: (params: CategoryModel) => {
    return axiosClient.post("/api/category/update", params)
  },
  deleteCategory: (categoryId: string) => {
    return axiosClient.post("/api/category/delete", { categoryId })
  },
  getCategoryList: () => {
    return axiosClient.get("/api/category")
  },
  getCategoryOptions: () => {
    return axiosClient.get("/api/category/options")
  },
}
