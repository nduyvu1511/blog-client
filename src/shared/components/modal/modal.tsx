import { ArrowLeftIcon, CloseIcon } from "@/assets"
import { ReactNode } from "react"

interface ModalProps {
  heading?: string
  onClose: Function
  children: ReactNode
  className?: string
  iconType?: "close" | "back"
  overLayClose?: boolean
  fullScreen?: boolean
}

const Modal = ({
  heading,
  onClose,
  children,
  className = "",
  iconType = "close",
  overLayClose = false,
  fullScreen = false,
}: ModalProps) => {
  console.log(className)
  return (
    <div className="fixed inset-[0] z-[3000]">
      <div
        className={`flex flex-col ${
          fullScreen ? "" : "sm:max-w-[810px] sm:max-h-[650px] sm:rounded-[30px]"
        } w-full absolute-center overflow-hidden h-full  bg-white-color z-10 ${className}`}
      >
        {heading ? (
          <div className="h-[60px] border-b border-solid border-gray-color-2 w-full flex px-24 items-center">
            <button onClick={() => onClose()} className="w-[30px]">
              {iconType === "close" ? (
                <CloseIcon className="text-gray-color-4 w-[26px] h-[26px]" />
              ) : (
                <ArrowLeftIcon className="text-gray-color-4 w-[20px] h-[20px]" />
              )}
            </button>

            <div className="flex-1">
              <p className="text-16 font-semibold leading-20 text-center text-gray-color-4 line-clamp-1">
                {heading}
              </p>
            </div>
            <div className="w-[30px]"></div>
          </div>
        ) : (
          <button onClick={() => onClose()} className="absolute z-10 right-[30px] top-[10px]">
            <CloseIcon />
          </button>
        )}

        <div className={`${fullScreen ? "max-h-screen" : "sm:max-h-[590px]"} flex-1 relative`}>
          {children}
        </div>
      </div>

      <div
        onClick={() => overLayClose && onClose && onClose()}
        className={`absolute inset-[0] bg-black-60 ${overLayClose ? "cursor-pointer" : ""}`}
      ></div>
    </div>
  )
}

export { Modal }
