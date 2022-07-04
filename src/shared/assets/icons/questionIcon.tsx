const QuestionIcon = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 41C32.0457 41 41 32.0457 41 21C41 9.9543 32.0457 1 21 1C9.9543 1 1 9.9543 1 21C1 32.0457 9.9543 41 21 41Z"
        stroke="currentColor"
      />
      <path
        d="M17 13.968C18 11.988 19 11 21 11C23.492 11 25 12.978 25 14.956C25 16.934 24 17.922 21 19.902V23M21 30V31"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { QuestionIcon }
