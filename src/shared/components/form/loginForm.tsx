import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { ButtonSubmit } from "@/components/buttons"
import { loginSchema } from "@/core/schema"
import { FORM_LOGIN_KEY, getFromLocalStorage, setToLocalStorage } from "@/helper"
import { loginParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface LoginFormProps {
  onSubmit?: (data: loginParams) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)
  const [showPw, setShowPw] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<loginParams>({
    resolver: yupResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: formStorage?.email || "",
      password: formStorage?.password || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: loginParams) => {
    const { password, email } = data
    onSubmit && onSubmit(data)
    setToLocalStorage(FORM_LOGIN_KEY, { email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="form-item">
        <label htmlFor={"phone"} className="form-label">
          Email (*)
        </label>

        <div className="">
          <input
            className={`form-input ${errors?.["email"] ? "form-input-err" : ""}`}
            id={"email"}
            type="text"
            placeholder="example@gmail.com"
            {...register("email", {
              required: true,
            })}
          />
        </div>

        {errors.email || dirtyFields.email ? (
          <p className="form-err-msg">{errors.email?.message}</p>
        ) : null}
      </div>

      <div className="form-item">
        <label htmlFor={"password"} className="form-label">
          Mật Khẩu (*)
        </label>
        <div className="form-item">
          <div className="relative">
            <input
              className={`form-input ${errors?.["password"] ? "form-input-err" : ""}`}
              id={"password"}
              type={showPw ? "text" : "password"}
              placeholder="Mật khẩu"
              {...register("password", {
                required: true,
              })}
            />

            <span
              onClick={() => setShowPw(!showPw)}
              className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[10px]"
            >
              {showPw ? <EyeHideIcon /> : <EyeShowIcon />}
            </span>
          </div>
          {errors.password || dirtyFields.password ? (
            <p className="form-err-msg">{errors.password?.message}</p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-center my-[40px]">
        <ButtonSubmit onClick={() => handleSubmit(onSubmitHandler)} isError={!isValid} />
      </div>

      <div className="text-14 font-medium text-gray-color-4 leading-26 text-center">
        Bạn chưa có tài khoản?{" "}
        <Link href="/register">
          <a className="text-primary cursor-pointer">Đăng ký</a>
        </Link>
      </div>
    </form>
  )
}
