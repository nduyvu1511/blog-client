import { EditIcon, EyeShowIcon } from "@/assets"
import { IoTrashBinOutline } from "react-icons/io5"
import { PostRes } from "@/models"
import moment from "moment"
import Image from "next/image"

interface BlogItemProps {
  blog: PostRes
  isLoading?: boolean
  onClickDetail?: Function
  onClickEdit?: Function
  onClickDelete?: Function
}

const BlogItem = ({
  blog,
  isLoading = false,
  onClickDelete,
  onClickDetail,
  onClickEdit,
}: BlogItemProps) => {
  if (isLoading) {
    return (
      <div className="flex mb-[24px]">
        <div className="skeleton w-[100px] h-[100px]"></div>
        <div className="flex-1 ml-[12px]">
          <div className="skeleton rounded-[4px] h-[20px] mb-[8px]"></div>
          <div className="skeleton rounded-[4px] h-[25px] mb-[12px]"></div>
          <div className="max-w-[200px] w-full skeleton h-[15px]"></div>
        </div>
      </div>
    )
  }
  return (
    <div key={blog.postId} className="flex">
      <div className="relative h-[100px] w-[100px]">
        <Image src={blog.thumbnail} alt="" layout="fill" objectFit="cover" />
      </div>
      <div className="flex-1 mx-[12px]">
        <div className="">
          <p className="text-16 font-medium mb-[8px] line-clamp-1">{blog.title}</p>
          <p className="text-14 font-normal mb-[8px] line-clamp-2">{blog.shortContent}</p>
          <p className="text-12">
            <span>{moment(blog.createdAt).fromNow()}</span>
            <span className="ml-[10px]">
              Đăng bởi: <span className="font-medium">{blog.author.authorName}</span>
            </span>
          </p>
          <p></p>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <button
          onClick={() => onClickEdit && onClickEdit()}
          className="bg-info flex-center w-[40px] h-[40px] font-medium text-16"
        >
          <EditIcon className="text-white-color" />
        </button>
        <button
          onClick={() => onClickDetail && onClickDetail()}
          className="bg-blue-4 flex-center w-[40px] h-[40px] font-medium text-16"
        >
          <EyeShowIcon className="text-white-color" />
        </button>
        <button
          onClick={() => onClickDelete && onClickDelete()}
          className="bg-error flex-center w-[40px] h-[40px] font-medium text-16"
        >
          <IoTrashBinOutline className="text-white-color" />
        </button>
      </div>
    </div>
  )
}

export { BlogItem }
