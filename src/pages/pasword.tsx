import { PasswordForm } from "@/components"
import { UserContainer } from "@/container"
import { usePassword } from "@/hooks"
import { MainLayout } from "@/layout"

const Password = () => {
  const { changePassword } = usePassword()

  return (
    <UserContainer>
      <section className="py-24">
        <div className="max-w-[550px] shadow-box p-24 w-full mx-auto rounded-[4px]">
          <PasswordForm onSubmit={(data) => changePassword(data, () => {})} />
        </div>
      </section>
    </UserContainer>
  )
}

Password.Layout = MainLayout
export default Password
