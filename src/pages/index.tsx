import { SpinnerIcon } from "@/assets"
import { BlogDetail, BlogItem, Modal, ModalConfirm } from "@/components"
import { PostContainer } from "@/container"
import { toggleBodyOverflow } from "@/helper"
import { useBlog, useBlogDetail, useCategory } from "@/hooks"
import { MainLayout } from "@/layout"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch } from "react-redux"
import Select from "react-select"
import { notify } from "reapop"

const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const deleteBlogId = useRef<string>()
  const {
    data: blogList,
    isValidating,
    hasMore,
    fetchMoreBlogs,
    deletePost,
    loadingMore,
    filterBlogs,
  } = useBlog(true)
  const { data: categoryList, isValidating: categoryLoading } = useCategory(true)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [blogDetailId, setBlogDetailId] = useState<string | undefined>()
  const { data: blogDetail } = useBlogDetail(blogDetailId)

  const handleCloseErrorModal = () => {
    setShowErrorModal(false)
    deleteBlogId.current = undefined
  }

  return (
    <>
      <PostContainer>
        <div className="flex items-center py-[24px]">
          <h1 className="text-16 py-[10px] font-semibold mr-[12px]">Lọc theo danh mục</h1>
          <div className="form-select w-[300px]">
            <Select
              defaultValue={{ label: "Tất cả", value: "" }}
              placeholder={"Danh mục"}
              options={[
                { label: "Tất cả", value: "" },
                ...categoryList?.map((item) => ({
                  value: item.categoryId,
                  label: item.name,
                })),
              ]}
              onChange={(val) => filterBlogs({ categoryId: val?.value || "" })}
            />
          </div>
        </div>

        <div className="py-24">
          <InfiniteScroll
            loader={
              loadingMore ? (
                <div className="py-10 flex-center">
                  <SpinnerIcon className="animate-spin" />
                </div>
              ) : null
            }
            dataLength={blogList.length}
            hasMore={hasMore}
            next={() => fetchMoreBlogs()}
          >
            <ul>
              {isValidating ? (
                <>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <BlogItem key={index} blog={null as any} isLoading={true} />
                  ))}
                </>
              ) : null}

              {!isValidating && blogList?.length > 0
                ? blogList.map((item) => (
                    <li className="mb-[24px]" key={item.postId}>
                      <BlogItem
                        onClickDelete={() => {
                          deleteBlogId.current = item.postId
                          setShowErrorModal(true)
                        }}
                        onClickDetail={() => {
                          setBlogDetailId(item.postId)
                          toggleBodyOverflow("hidden")
                        }}
                        onClickEdit={() => router.push(`/${item.postId}`)}
                        blog={item}
                      />
                    </li>
                  ))
                : null}

              {blogList?.length === 0 ? (
                <div className="flex-center py-[20px]">
                  <p className="text-16 font-medium">Không tìm thấy bài đăng nào</p>
                </div>
              ) : null}
            </ul>
          </InfiniteScroll>
        </div>
      </PostContainer>

      {showErrorModal ? (
        <ModalConfirm
          desc="Nếu đồng ý bạn sẽ xóa bài viết này và người dùng sẽ không còn thấy nó trên trang web nữa!"
          onClose={handleCloseErrorModal}
          onConfirm={() => {
            if (!deleteBlogId.current) return
            deletePost(deleteBlogId.current, () => {
              handleCloseErrorModal()
              dispatch(notify("Xóa bài viết thành công", "error"))
            })
          }}
          type="error"
        />
      ) : null}

      {blogDetailId ? (
        <Modal
          fullScreen
          onClose={() => {
            setBlogDetailId(undefined)
            toggleBodyOverflow("unset")
          }}
        >
          {!blogDetail ? (
            <div className="py-[40px] flex-center">
              <SpinnerIcon className="animate-spin" />
            </div>
          ) : (
            <div className="h-screen overflow-y-auto news-container">
              <BlogDetail blog={blogDetail} />
            </div>
          )}
        </Modal>
      ) : null}
    </>
  )
}

Home.Layout = MainLayout
export default Home
