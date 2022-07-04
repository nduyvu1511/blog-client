import React from "react"

export const CheckCircleIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#1F8B24"
      />
      <path
        d="M5.57629 12.5L10.3941 17.3178L18.4237 7.68225"
        stroke="#1F8B24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
