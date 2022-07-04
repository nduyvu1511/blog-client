import { EMAIL_REGEX, PASSWORD_SCHEMA, PHONE_SCHEMA } from "@/helper"
import * as Yup from "yup"

export const phoneNumberSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(PHONE_SCHEMA, "Vui lòng nhập số điện thoại hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
})

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, "Vui lòng nhập định dạng email")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 số")
    .required("Vui lòng nhập mật khẩu"),
})

export const passwordSchema = Yup.object().shape({
  current_password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 số")
    .required("Vui lòng nhập email"),
  new_password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 số")
    .required("Vui lòng nhập mật khẩu"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Mật khẩu xác nhận phải trung khớp")
    .required("Vui lòng nhập mật khẩu"),
})

export const profileSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập tên"),
  avatar: Yup.string().required("Vui lòng chọn avatar"),
  bio: Yup.string().required("Vui lòng nhập mô tả"),
  email: Yup.string().required("Vui lòng nhập email"),
})

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, "Vui lòng nhập định dạng email")
    .required("Vui lòng nhập email"),
  name: Yup.string().required("Vui lòng nhập tên"),
  avatar: Yup.string().nullable(),
  bio: Yup.string().nullable(),
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, ít nhất 1 chữ cái, 1 số")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận phải trung khớp")
    .required("Vui lòng nhập mật khẩu xác nhận"),
})

export const ratingFormSchema = Yup.object().shape({
  desc: Yup.string().required("Vui lòng nhập trường này"),
  star: Yup.number()
    .oneOf([1, 2, 3, 4, 5], "Vui lòng nhập số từ 1 đến 5")
    .required("Vui lòng nhập số sao"),
})

export const createPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .matches(PASSWORD_SCHEMA, "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ, số và ký tự đặc biệt")
    .required("Vui lòng nhập mật khẩu"),
  re_password: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu xác nhận phải trùng với mật khẩu mới")
    .required("Vui lòng nhập xác nhận mật khẩu"),
})

export const blogFormSchema = Yup.object().shape({
  title: Yup.string().required("Vui lòng nhập trường này"),
  shortContent: Yup.string().required("Vui lòng nhập trường này"),
  thumbnail: Yup.string().required("Vui lòng nhập trường này"),
  slug: Yup.string().required("Vui lòng nhập trường này"),
  categoryId: Yup.string().required("Vui lòng nhập trường này"),
})

export const categoryFormSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập trường này"),
  slug: Yup.string().required("Vui lòng nhập trường này"),
  parentId: Yup.string().nullable(),
  image: Yup.string().nullable(),
  desc: Yup.string().nullable(),
})
