import React from "react"

const SearchIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="40"
      height="38"
      viewBox="0 0 40 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_157_3211)">
        <path
          d="M35 33.0002L27.5234 25.5102M31.6667 15.5002C31.6667 19.2574 30.1742 22.8607 27.5174 25.5175C24.8606 28.1743 21.2573 29.6668 17.5 29.6668C13.7428 29.6668 10.1395 28.1743 7.48269 25.5175C4.82593 22.8607 3.33337 19.2574 3.33337 15.5002C3.33337 11.7429 4.82593 8.13958 7.48269 5.48282C10.1395 2.82605 13.7428 1.3335 17.5 1.3335C21.2573 1.3335 24.8606 2.82605 27.5174 5.48282C30.1742 8.13958 31.6667 11.7429 31.6667 15.5002V15.5002Z"
          stroke="#373737"
          strokeLinecap="round"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_157_3211"
          x="-1.16663"
          y="0.833496"
          width="40.6666"
          height="40.6665"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_3211" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_157_3211"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export { SearchIcon }
