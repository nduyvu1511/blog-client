export type BlogFormFieldKeys = "title" | "shortContent" | "thumbnail" | "slug" | "categoryId"
export type ProfileFormFieldKeys = "name" | "avatar" | "bio" | "email"

export const blogFormFields: {
  label: string
  name: BlogFormFieldKeys
  type: "text" | "select" | "file"
}[] = [
  {
    label: "Hình đại diện",
    name: "thumbnail",
    type: "file",
  },
  {
    label: "Danh mục",
    name: "categoryId",
    type: "select",
  },
  {
    label: "Tiều đề",
    name: "title",
    type: "text",
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
  },
  {
    label: "Tóm tắt nội dung",
    name: "shortContent",
    type: "text",
  },
]

export const profileFormFields: {
  label: string
  name: ProfileFormFieldKeys
  type: "text" | "select" | "file"
}[] = [
  {
    label: "Ảnh đại diện",
    name: "avatar",
    type: "file",
  },
  {
    label: "Họ & Tên",
    name: "name",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
  },
  {
    label: "Mô tả",
    name: "bio",
    type: "text",
  },
]

export type CategoryFormFieldKeys = "name" | "slug" | "parentId" | "image" | "desc"
export type PasswordFormFieldKeys = "current_password" | "new_password" | "confirm_password"

export const categoryFormFields: {
  label: string
  name: CategoryFormFieldKeys
  type: "text" | "select" | "file"
  isRequired: boolean
}[] = [
  {
    label: "Tải ảnh lên",
    name: "image",
    type: "file",
    isRequired: false,
  },
  {
    label: "Tên danh mục",
    name: "name",
    type: "text",
    isRequired: true,
  },
  {
    label: "Slug",
    name: "slug",
    type: "text",
    isRequired: true,
  },
  {
    label: "Danh mục cha",
    name: "parentId",
    type: "select",
    isRequired: false,
  },
  {
    label: "Mô tả",
    name: "desc",
    type: "text",
    isRequired: false,
  },
]

export const passwordFormFields: {
  label: string
  name: PasswordFormFieldKeys
}[] = [
  {
    label: "Mật khẩu cũ",
    name: "current_password",
  },
  {
    label: "Mật khẩu mới",
    name: "new_password",
  },
  {
    label: "Xác nhận mật khẩu mới",
    name: "confirm_password",
  },
]
