interface ButtonSubmitProps {
  title?: string
  onClick?: Function
  isError?: boolean
  className?: string
  view?: "modal" | "page"
}

export const ButtonSubmit = ({
  onClick,
  isError,
  title,
  className = "",
  view,
}: ButtonSubmitProps) => {
  return (
    <div
      className={`flex-center ${
        view === "modal" ? "absolute left-[0] bottom-[0] right-[0] py-10 bg-white-color" : " "
      }`}
    >
      <button
        onClick={() => onClick && onClick()}
        type="submit"
        className={`btn-primary hover:bg-primary hover:border-none border-none hover:text-white-color ${
          isError ? "btn-disabled" : ""
        } ${className} `}
      >
        {title || "Xác nhận"}
      </button>
    </div>
  )
}
