import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactChild, ReactElement, ReactNode } from "react"

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface AuthorModel {
  _id: string
  name: string
  avatar: string
  bio: string
  email: string
  postIds: string[]
  password: string
}

export interface CategoryModel {
  name: string
  slug: string
  parentId: string
  image?: string
  desc?: string
}

export interface UpdateCategoryParams extends CategoryModel {
  categoryId: string
}

export interface CategoryOptions {
  categoryId: string
  name: string
  slug: string
  parentId: string
  image: string
  desc: string
  createdAt: string
}

export interface CategoryRes extends CategoryOptions {
  postCount: number
}

export interface PostModel {
  title: string
  content: string
  shortContent: string
  tags?: string[]
  thumbnail: string
  slug: string
  categoryId: string
}

export interface UpdatePostProps extends PostModel {
  postId: string
}

export interface PostRes {
  postId: string
  title: string
  subTitle: string
  content: string
  shortContent: string
  author: {
    authorId: string
    authorName: string
  }
  tags: string[]
  thumbnail: string
  slug: string
  category: {
    categoryId: string
    categoryName: string
  }
  createdAt: string
}

export interface PostDetailRes {
  postId: string
  title: string
  subTitle: string
  content: string
  shortContent: string
  author: {
    authorId: string
    authorName: string
  }
  tags: string[]
  thumbnail: string
  slug: string
  category: {
    categoryId: string
    categoryName: string
  }
  createdAt: string
  relatedPosts: RelatedPost[]
}

export interface RelatedPost {
  postId: string
  slug: string
  thumbnail: string
  subTitle: string
  shortContent: string
  createdAt: string
}

export interface ListParams {
  limit?: number
  offset?: number
}
export interface getPostsByCategoryParams extends ListParams {
  categoryId: string
}

export interface BlogFormParams {
  title: string
  shortContent: string
  thumbnail: string
  slug: string
  categoryId: string
}

export interface OptionModel {
  label: string
  value: string
}

export type ImageUploadFolder = "blog_images" | "category_images" | "avatar"

export interface ImageUploadParams {
  folder: ImageUploadFolder
  base64Str: string
}

export interface ImageUploadRes {
  url: string
  assetId: string
}

export interface FilterBlogParams extends ListParams {
  categoryId?: string
}

export interface loginParams {
  email: string
  password: string
}

export interface AuthorRes {
  authorId: string
  name: string
  avatar: string
  bio: string
  email: string
}

export interface Register {
  name: string
  avatar?: string
  bio?: string
  email: string
  password: string
  confirmPassword: string
}

export interface ChangePasswordParams {
  current_password: string
  new_password: string
  confirm_password: string
}

export interface ProfileFormParams {
  name: string
  avatar: string
  email: string
  bio: string
}
