import React from "react"

const ShareIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="38"
      height="36"
      viewBox="0 0 38 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_157_3221)">
        <circle cx="10.8631" cy="15.9125" r="5.46087" stroke="#373737" />
        <circle cx="28.4937" cy="5.41855" r="3.92245" stroke="#373737" />
        <circle cx="28.6727" cy="26.5783" r="3.925" stroke="#373737" />
        <path d="M15.7102 18.3857L24.9066 24.7569M15.7102 13.8779L24.9066 7.146" stroke="#373737" />
      </g>
      <defs>
        <filter
          id="filter0_d_157_3221"
          x="0.902222"
          y="0.996094"
          width="36.1954"
          height="38.0073"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_157_3221" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_157_3221"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export { ShareIcon }
