import { setToLocalStorage } from "@/helper"
import { useAttachment, useUploadAttachment } from "@/hooks"
import dynamic from "next/dynamic"
import { useMemo, useRef, useState } from "react"
import "react-quill/dist/quill.snow.css"

const ReactQuill: any = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill")

    // eslint-disable-next-line react/display-name
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />
  },
  {
    ssr: false,
  }
) as any

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "align",
  "color",
  "background",
  "indent",
  "link",
  "image",
  "undo",
]

interface blogEditorProps {
  onSubmit?: (val: string) => void
  defaultValue?: string
  btnLabel?: string
}

const BlogEditor = ({ onSubmit, defaultValue, btnLabel }: blogEditorProps) => {
  const quillRef = useRef<any>(null)
  const { getBase64Images } = useAttachment({ limit: 10 })
  const { uploadImage } = useUploadAttachment()
  const [text, setText] = useState<string>(defaultValue || "")

  const handleSetText = (val: string) => {
    setToLocalStorage("blog_form_content", val)
    setText(val)
  }

  const handleUploadImage = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.onchange = (e: any) => {
      const files = e.target?.files
      if (!files?.length) return

      getBase64Images(files, (imgs) => {
        if (!imgs?.[0]) return
        const image = imgs?.[0] || ""
        if (!image) return

        uploadImage({ base64Str: image, folder: "blog_images" }, (val) => {
          const quill = quillRef.current?.getEditor()
          const range = quill.getSelection(true)
          quill.insertEmbed(range.index, "image", val.url)
        })
      })
    }
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ color: [] }, { background: [] }],
          [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
        ],

        handlers: {
          image: () => handleUploadImage(),
        },
        clipboard: {
          matchVisual: false,
        },
      },
    }
  }, [])

  return (
    <div className="">
      <div className="pb-[64px]">
        <ReactQuill
          forwardedRef={quillRef}
          value={text}
          onChange={(val: string) => handleSetText(val)}
          modules={modules}
          formats={formats}
        />
      </div>

      <div className="flex-center fixed bottom-0 p-12 left-[250px] right-0 bg-white-color">
        <button
          onClick={() => onSubmit && onSubmit(text)}
          className={`btn-primary ${!text ? "btn-disabled" : ""}`}
        >
          {btnLabel || "Tiếp tục"}
        </button>
      </div>
    </div>
  )
}

export { BlogEditor }
