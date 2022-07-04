import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { ButtonSubmit } from "@/components/buttons"
import { registerSchema } from "@/core/schema"
import { FORM_LOGIN_KEY, getFromLocalStorage, setToLocalStorage } from "@/helper"
import { Register } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface RegisterFormProps {
  onSubmit?: (data: Register) => void
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const formStorage = getFromLocalStorage(FORM_LOGIN_KEY)
  const [showPw, setShowPw] = useState<boolean>(false)
  const [showCfPw, setShowCfPw] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<Register>({
    resolver: yupResolver(registerSchema),
    mode: "all",
    defaultValues: {
      email: formStorage?.email || "",
      password: formStorage?.password || "",
    },
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: Register) => {
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
        <label htmlFor={"name"} className="form-label">
          Họ & Tên (*)
        </label>

        <div className="">
          <input
            className={`form-input ${errors?.["name"] ? "form-input-err" : ""}`}
            id={"name"}
            type="text"
            placeholder="Họ & Tên"
            {...register("name", {
              required: true,
            })}
          />
        </div>

        {errors.name || dirtyFields.name ? (
          <p className="form-err-msg">{errors.name?.message}</p>
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

      <div className="form-item">
        <label htmlFor={"confirmPassword"} className="form-label">
          Xác nhận Mật Khẩu (*)
        </label>
        <div className="form-item">
          <div className="relative">
            <input
              className={`form-input ${errors?.["confirmPassword"] ? "form-input-err" : ""}`}
              id={"confirmPassword"}
              type={showCfPw ? "text" : "password"}
              placeholder="Mật khẩu"
              {...register("confirmPassword", {
                required: true,
              })}
            />

            <span
              onClick={() => setShowCfPw(!showCfPw)}
              className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[10px]"
            >
              {showCfPw ? <EyeHideIcon /> : <EyeShowIcon />}
            </span>
          </div>
          {errors.confirmPassword || dirtyFields.confirmPassword ? (
            <p className="form-err-msg">{errors.confirmPassword?.message}</p>
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
