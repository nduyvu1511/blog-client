const BlogDetail = ({ content }: { content: string }) => {
  return (
    <div
      className="p-24 max-w-[1280px] w-full mx-auto h-full"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  )
}

export { BlogDetail }
