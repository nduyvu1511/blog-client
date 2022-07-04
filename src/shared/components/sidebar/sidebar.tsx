import { EditIcon, MenuIcon, QuestionIcon } from "@/assets"
import { useRouter } from "next/router"
import { ReactNode, useCallback } from "react"

const Sidebar = () => {
  const router = useRouter()

  const isActive = useCallback(
    (paths: string[]) => {
      return paths?.includes(router.pathname)
    },
    [router.pathname]
  )

  return (
    <div className="w-full h-full">
      {(
        [
          [EditIcon, "Bài viết", "/", ["/", "/add", "/[blogId]"]],
          [MenuIcon, "Danh mục", "category", ["/category"]],
          [QuestionIcon, "Cài đặt", "profile", ["/profile"]],
        ] as [any, string, string, string[]][]
      ).map(([Icon, label, path, childPaths], index) => (
        <li
          onClick={() => router.push(path)}
          className={`flex items-center mb-[24px] last:mb-[0] py-[8px] px-[12px] cursor-pointer rounded-[5px] ${
            isActive(childPaths) ? "bg-primary" : ""
          }`}
          key={index}
        >
          <Icon
            className={`mr-[18px] w-[24px] h-[24px] ${
              isActive(childPaths) ? "text-white-color" : ""
            }`}
          />
          <span
            className={`text-14 font-medium text-gray-color-4 leading-26  ${
              isActive(childPaths) ? "text-white-color" : ""
            }`}
          >
            {label}
          </span>
        </li>
      ))}
    </div>
  )
}

export { Sidebar }
