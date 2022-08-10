import { Modal } from "@/components"
import { BlogEditor, BlogForm } from "@/components/form"
import { PostContainer } from "@/container"
import { getFromLocalStorage, setToLocalStorage } from "@/helper"
import { useBlog, useCategory } from "@/hooks"
import { MainLayout } from "@/layout"
import { PostModel } from "@/models"
import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const AddNews = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: categoryList } = useCategory(true)
  const { createPost } = useBlog()
  const [content, setContent] = useState<string>()

  const handleCreatePost = (params: PostModel) => {
    createPost(params, () => {
      setToLocalStorage("blog_form_content", undefined)
      dispatch(notify("Tạo tin tức thành công", "success"))
      router.push("/")
    })
  }

  return (
    <>
      <PostContainer>
        <div className="my-24">
          <BlogEditor
            defaultValue={getFromLocalStorage("blog_form_content")}
            onSubmit={(content) => {
              setContent(content)
            }}
          />
        </div>
      </PostContainer>

      {content ? (
        <Modal onClose={() => setContent("")} heading="Tạo tin tức mới">
          <div className="px-24 overflow-y-auto h-full">
            <BlogForm
              categoryOptions={categoryList.map((item) => ({
                label: item.name,
                value: item.categoryId,
              }))}
              onSubmit={(params) => handleCreatePost({ ...params, content })}
            />
          </div>
        </Modal>
      ) : null}
    </>
  )
}

AddNews.Layout = MainLayout
export default AddNews
