import { blankAvatar } from "@/assets"
import { RootState } from "@/core/store"
import { setToLocalStorage } from "@/helper"
import Image from "next/image"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

const UserInfo = () => {
  const router = useRouter()
  const { authorInfo } = useSelector((state: RootState) => state.profile)

  return (
    <div onClick={() => router.push("/profile")} className="flex items-center group relative">
      <div className="cursor-pointer relative w-[32px] h-[32px] rounded-[50%] overflow-hidden">
        <Image layout="fill" alt="" src={authorInfo?.avatar || blankAvatar} objectFit="cover" />
      </div>
      <div className="cursor-pointer ml-[12px]">
        <p className="text-14 font-medium line-clamp-1">{authorInfo?.name || ""}</p>
      </div>

      <div className="absolute hidden group-hover:block right-0 rounded-[4px] bg-white-color top-[calc(100%+0px)] shadow-box z-10">
        <button
          onClick={() => {
            setToLocalStorage("access_token", undefined)
            router.push("/login")
          }}
          className="whitespace-nowrap text-14 font-medium px-[24px] py-[10px] hover:bg-gray-color-1 w-full text-left"
        >
          Đăng xuất
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="whitespace-nowrap text-14 font-medium px-[24px] py-[10px] hover:bg-gray-color-1 w-full text-left"
        >
          Xem thông tin
        </button>
      </div>
    </div>
  )
}

export { UserInfo }
