import React from "react"

const EyeHideIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.257 8.962C20.731 9.582 20.731 10.419 20.257 11.038C18.764 12.987 15.182 17 11 17C6.81801 17 3.23601 12.987 1.74301 11.038C1.51239 10.7411 1.38721 10.3759 1.38721 10C1.38721 9.62408 1.51239 9.25887 1.74301 8.962C3.23601 7.013 6.81801 3 11 3C15.182 3 18.764 7.013 20.257 8.962V8.962Z"
        stroke="#595959"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="19.8278"
        y1="1.39669"
        x2="2.84908"
        y2="17.0292"
        stroke="#595959"
        strokeLinecap="round"
      />
      <path
        d="M11 13C12.6569 13 14 11.6569 14 10C14 8.34315 12.6569 7 11 7C9.34315 7 8 8.34315 8 10C8 11.6569 9.34315 13 11 13Z"
        stroke="#595959"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { EyeHideIcon }
