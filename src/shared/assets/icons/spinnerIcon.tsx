import React from "react"

const SpinnerIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.125 2.9276C22.0271 1.139 18.4255 0.42261 14.8789 0.889539C11.3323 1.35647 8.03891 2.98062 5.50946 5.5101C2.98002 8.03958 1.35591 11.333 0.889024 14.8796C0.422139 18.4262 1.13857 22.0278 2.92721 25.1257C4.71585 28.2236 7.47673 30.6448 10.7817 32.0136C14.0866 33.3825 17.7508 33.6226 21.2061 32.6967C24.6614 31.7708 27.7146 29.7306 29.8922 26.8926C32.0698 24.0546 33.2501 20.5773 33.25 17.0001"
        stroke="#373737"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { SpinnerIcon }
