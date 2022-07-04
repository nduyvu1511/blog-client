import { RegisterForm, SpinnerLoading } from "@/components"
import { useAuth } from "@/hooks"
import { useRouter } from "next/router"

const Register = () => {
  const router = useRouter()
  const { register } = useAuth()

  return (
    <>
      <section className="max-w-[550px] mx-auto w-full py-[24px]">
        <div className="shadow-box p-24 rounded-[4px]">
          <h1 className="text-24 font-semibold py-10">Đăng ký</h1>
          <RegisterForm
            onSubmit={(data) => {
              register(data, () => {
                router.push("/login")
              })
            }}
          />
        </div>
      </section>

      <SpinnerLoading />
    </>
  )
}

export default Register
