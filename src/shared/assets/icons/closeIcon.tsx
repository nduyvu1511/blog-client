import React from "react"

const CloseIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="8.04048"
        y1="7.3335"
        x2="32.6667"
        y2="31.9597"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <line
        x1="32.6666"
        y1="8.0406"
        x2="8.0404"
        y2="32.6668"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { CloseIcon }
