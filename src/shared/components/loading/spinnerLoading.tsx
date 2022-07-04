import { SpinnerIcon } from "@/assets"
import { RootState } from "@/core/store"
import { useSelector } from "react-redux"

const SpinnerLoading = () => {
  const { isScreenLoading } = useSelector((state: RootState) => state.common)
  return (
    <>
      {isScreenLoading ? (
        <div className="fixed inset-[0] bg-black-60 z-[4000]">
          <div className="absolute-center z-10 bg-white-color py-[20px] px-[30px] rounded-[8px] flex-center flex-col">
            <span className="text-base font-medium mb-[12px]">Vui lòng đợi</span>
            <SpinnerIcon className="animate-spin text-[30px] text-white-color" />
          </div>
        </div>
      ) : null}
    </>
  )
}

export { SpinnerLoading }
