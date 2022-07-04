import { SpinnerLoading } from "@/components"
import { RootState } from "@/core"
import { useToken } from "@/hooks"
import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import NotificationsSystem, { atalhoTheme, dismissNotification, setUpNotifications } from "reapop"

const Auth = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications)
  const { token } = useToken()
  const router = useRouter()

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: "top-center",
        dismissible: true,
        dismissAfter: 3000,
        status: "success",
      },
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!token) router.push("/login")
  }, [token])

  return (
    <>
      {children}
      <SpinnerLoading />
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
    </>
  )
}

export { Auth }
