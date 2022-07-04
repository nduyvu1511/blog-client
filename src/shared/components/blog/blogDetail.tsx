import { PostRes } from "@/models"

const BlogDetail = ({ blog }: { blog: PostRes }) => {
  return (
    <div
      className="p-24 max-w-[1280px] w-full mx-auto h-full"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    ></div>
  )
}

export { BlogDetail }
