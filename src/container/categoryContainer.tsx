import { UserInfo } from "@/components"
import { ReactNode } from "react"

interface CategoryContainerProps {
  children: ReactNode
  onClickAddBtn?: Function
}

const CategoryContainer = ({ children, onClickAddBtn }: CategoryContainerProps) => {
  return (
    <div className="">
      <div className="border-b border-gray-color-2 border-solid mx-24">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex">
              <li className={`list-none mr-[24px] last:mr-0`}>
                <button
                  onClick={() => onClickAddBtn && onClickAddBtn()}
                  className="text-16 font-medium"
                >
                  Thêm danh mục
                </button>
              </li>
            </div>
          </div>
          <div className="flex items-center justify-end px-24 py-[24px] max-w-[200px] w-full">
            <UserInfo />
          </div>
        </div>
      </div>
      <div className="px-24">{children}</div>
    </div>
  )
}

export { CategoryContainer }

