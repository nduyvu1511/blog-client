import { CheckCircleIcon, ErrorCircleIcon, WarningIcon } from "@/assets"
import { useMemo } from "react"

interface ModalConfirmProps {
  onClose: Function
  desc: string
  className?: string
  type?: "warning" | "error" | "success"
  onConfirm: Function
}

const ModalConfirm = ({
  onClose,
  desc,
  className = "",
  type = "success",
  onConfirm,
}: ModalConfirmProps) => {
  return (
    <div className="fixed inset-[0] z-[3000]">
      <div
        className={`flex flex-col sm:max-w-[448px] w-full absolute-center overflow-hidden bg-white-color sm:rounded-[30px] px-[40px] z-10 ${className}`}
      >
        <div className="flex-1 flex-center flex-col mb-[40px]">
          {type == "error" ? (
            <ErrorCircleIcon className="w-[80px] h-[80px] my-[40px]" />
          ) : type === "success" ? (
            <CheckCircleIcon className="w-[80px] h-[80px] my-[40px]" />
          ) : (
            <WarningIcon className="w-[80px] h-[80px] my-[40px]" />
          )}
          <p className="line-clamp-3 text-16 font-medium leading-26 text-center">{desc}</p>
        </div>

        <div className="flex-center mb-[40px]">
          <button
            onClick={() => onClose()}
            className="btn px-[43px] py-[13px] mr-[20px] bg-disabled"
          >
            Quay lại
          </button>
          <button
            onClick={() => onConfirm()}
            className={`btn bg-gray-color-1 text-white-color ${
              type === "success" ? "bg-success" : type === "warning" ? "bg-warning" : "bg-error"
            }`}
          >
            Xác minh
          </button>
        </div>
      </div>

      <div className={`absolute inset-[0] bg-black-60`}></div>
    </div>
  )
}

export { ModalConfirm }
