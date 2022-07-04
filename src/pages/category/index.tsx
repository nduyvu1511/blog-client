import { Modal, ModalConfirm } from "@/components"
import { CategoryForm } from "@/components/form"
import { CategoryContainer } from "@/container"
import { useCategory } from "@/hooks"
import { MainLayout } from "@/layout"
import { CategoryModel, OptionModel, UpdateCategoryParams } from "@/models"
import moment from "moment"
import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { notify } from "reapop"

const Category = () => {
  const dispatch = useDispatch()
  const {
    data: categoryList,
    isValidating,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategory(true)
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [categoryDetailId, setCategoryDetailId] = useState<string>()
  const [categoryDeleteId, setCategoryDeleteId] = useState<string>()

  const handleCreateCategory = (data: CategoryModel) => {
    createCategory(data, () => {
      setShowCreateModal(false)
      dispatch(notify("Thêm mới danh mục thành công", "success"))
    })
  }

  const handleUpdateCategory = (data: UpdateCategoryParams) => {
    if (!data.categoryId) return
    updateCategory(data, () => {
      setCategoryDetailId("")
      dispatch(notify("Chỉnh sửa danh mục thành công", "success"))
    })
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id, () => {
      dispatch(notify("Xóa danh mục thành công", "success"))
      setCategoryDeleteId("")
    })
  }

  const categoryOptions: OptionModel[] = useMemo(() => {
    return categoryList.map((item) => ({
      label: item.name,
      value: item.categoryId,
    }))
  }, [categoryList])

  return (
    <>
      <CategoryContainer onClickAddBtn={() => setShowCreateModal(true)}>
        <div className="py-24">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-color-3">
              <thead className="text-14 text-gray-color-4 uppercase bg-gray-color-1">
                <tr>
                  <th scope="col" className="px-[12px] py-[12px]">
                    STT
                  </th>
                  <th scope="col" className="px-[12px] py-[12px]">
                    Tên Danh mục
                  </th>
                  <th scope="col" className="px-[12px] py-[12px]">
                    Slug
                  </th>
                  <th scope="col" className="px-[12px] py-[12px]">
                    Số bài viết
                  </th>
                  <th scope="col" className="px-[12px] py-[12px]">
                    Ngày tạo
                  </th>
                  <th scope="col" className="px-[12px] py-[12px]">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryList?.length > 0 &&
                  categoryList.map((item, index) => (
                    <tr key={item.categoryId} className="bg-white border-b hover:bg-gray-color-1">
                      <td className="px-[12px] py-[16px]">{index + 1}</td>
                      <th
                        scope="row"
                        className="px-[12px] py-[16px] font-medium text-gray-color-4 whitespace-nowrap"
                      >
                        {item.name}
                      </th>
                      <td className="px-[12px] py-[16px]">{item.slug}</td>
                      <td className="px-[12px] py-[16px]">{item.postCount}</td>
                      <td className="px-[12px] py-[16px]">
                        {moment(item.createdAt).format("HH:MM DD/MM/YYYY")}
                      </td>
                      <td className="px-[12px] py-[16px] text-right">
                        {/* <button className="w-[30px] h-[30px] bg-error ">
                        <IoTrashBinOutline className="m-auto text-white-color" />
                      </button> */}
                        <button
                          onClick={() => setCategoryDetailId(item.categoryId)}
                          className="font-semibold mr-[12px] text-blue-3 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setCategoryDeleteId(item.categoryId)}
                          className="font-semibold text-error dark:text-blue-500 hover:underline"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </CategoryContainer>

      {showCreateModal ? (
        <Modal heading="Tạo mới danh mục" onClose={() => setShowCreateModal(false)}>
          <div className="p-24 h-full overflow-y-auto">
            <CategoryForm
              onSubmit={(data) => handleCreateCategory(data)}
              categoryOptions={categoryOptions}
            />
          </div>
        </Modal>
      ) : null}

      {categoryDetailId ? (
        <Modal heading="Tạo mới danh mục" onClose={() => setCategoryDetailId("")}>
          <div className="p-24 h-full overflow-y-auto">
            <CategoryForm
              categoryOptions={categoryOptions}
              mode="update"
              defaultValues={categoryList?.find((item) => item.categoryId === categoryDetailId)}
              onSubmit={(data) => handleUpdateCategory({ ...data, categoryId: categoryDetailId })}
            />
          </div>
        </Modal>
      ) : null}

      {categoryDeleteId ? (
        <ModalConfirm
          type="error"
          desc="Nếu xác nhận, bạn sẽ xóa đi danh mục này!"
          onClose={() => setCategoryDeleteId("")}
          onConfirm={() => handleDeleteCategory(categoryDeleteId)}
        />
      ) : null}
    </>
  )
}

Category.Layout = MainLayout
export default Category
