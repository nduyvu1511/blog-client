import React from "react"

const MenuIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="28"
      height="8"
      viewBox="0 0 28 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1H27M1 7H27"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { MenuIcon }
