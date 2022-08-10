import { UserInfo } from "@/components"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"

const UserContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <div className="">
      <div className="border-b border-gray-color-2 border-solid mx-24">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex">
              {[
                ["Thông tin", "/profile"],
                ["Mật khẩu", "/pasword"],
              ].map(([label, path], index) => (
                <li
                  className={`list-none mr-[24px] last:mr-0 ${
                    router.pathname === path ? "text-primary" : ""
                  }`}
                  key={index}
                >
                  <Link href={path}>
                    <a className="text-16 font-medium">{label}</a>
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end px-24 py-[24px] max-w-[200px] z-[1000] w-full">
            <UserInfo />
          </div>
        </div>
      </div>
      <div className="px-24">{children}</div>
    </div>
  )
}

export { UserContainer }
