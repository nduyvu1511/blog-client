import { LoginForm, SpinnerLoading } from "@/components"
import { useAuth } from "@/hooks"
import { useRouter } from "next/router"

const Login = () => {
  const { login } = useAuth()
  const router = useRouter()

  return (
    <>
      <section className="max-w-[550px] mx-auto w-full py-[24px]">
        <div className="shadow-box p-24 rounded-[4px]">
          <h1 className="text-24 font-semibold py-10">Đăng nhập</h1>
          <LoginForm
            onSubmit={(data) => {
              login(data, () => {
                router.push("/")
              })
            }}
          />
        </div>
      </section>
      <SpinnerLoading />
      
    </>
  )
}

export default Login
