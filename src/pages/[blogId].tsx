import { SpinnerIcon } from "@/assets"
import { Modal } from "@/components"
import { BlogEditor, BlogForm } from "@/components/form"
import { PostContainer } from "@/container"
import { setToLocalStorage } from "@/helper"
import { useBlog, useBlogDetail, useCategory } from "@/hooks"
import { MainLayout } from "@/layout"
import { UpdatePostProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const EditBlog = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: categoryList } = useCategory(true)
  const { updatePost } = useBlog()
  const [content, setContent] = useState<string>()
  const { data: blogDetail, mutate } = useBlogDetail(router.query.blogId as string)

  const handleUpdatePost = (params: UpdatePostProps) => {
    updatePost(params, () => {
      dispatch(notify("Chỉnh sửa tin tức thành công", "success"))
      router.push("/")
      setToLocalStorage("blog_form_content", undefined)
    })
  }

  useEffect(() => {
    return () => {
      mutate(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!blogDetail)
    return (
      <div className="py-[50px] flex-center">
        <SpinnerIcon className="animate-spin" />
      </div>
    )

  return (
    <>
      <PostContainer>
        <div className="py-24 mx-auto max-w-[1000px] w-full">
          <BlogEditor
            defaultValue={blogDetail?.content}
            onSubmit={(content) => {
              setContent(content)
            }}
          />
        </div>
      </PostContainer>

      {content ? (
        <Modal onClose={() => setContent("")} heading="Chỉnh sửa tin tức">
          <div className="px-24 overflow-y-auto h-full">
            <BlogForm
              mode="update"
              defaultValues={{
                categoryId: blogDetail?.category.categoryId || "",
                shortContent: blogDetail?.shortContent || "",
                slug: blogDetail?.slug || "",
                thumbnail: blogDetail?.thumbnail || "",
                title: blogDetail?.title || "",
              }}
              categoryOptions={categoryList.map((item) => ({
                label: item.name,
                value: item.categoryId,
              }))}
              onSubmit={(params) =>
                router.query?.blogId &&
                handleUpdatePost({ ...params, content, postId: router.query?.blogId + "" })
              }
            />
          </div>
        </Modal>
      ) : null}
    </>
  )
}
EditBlog.Layout = MainLayout

export default EditBlog
