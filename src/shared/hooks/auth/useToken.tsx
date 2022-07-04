import { getFromLocalStorage, setToLocalStorage } from "@/helper"
import { useState } from "react"

interface Res {
  token: string | undefined
  setToken: (params: string | undefined) => void
}

const useToken = (): Res => {
  const [token, setToken] = useState<string | undefined>(
    getFromLocalStorage("access_token") || undefined
  )

  const handleSetToken = (token: string | undefined) => {
    setToken(token)
    setToLocalStorage("access_token", token)
  }

  return {
    token,
    setToken: handleSetToken,
  }
}

export { useToken }
