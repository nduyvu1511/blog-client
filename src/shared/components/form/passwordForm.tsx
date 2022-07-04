import { EyeHideIcon, EyeShowIcon } from "@/assets"
import { ButtonSubmit } from "@/components/buttons"
import { passwordSchema } from "@/core/schema"
import { PasswordFormFieldKeys, passwordFormFields } from "@/helper"
import { ChangePasswordParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface PasswordFormProps {
  onSubmit?: (data: ChangePasswordParams) => void
}

export const PasswordForm = ({ onSubmit }: PasswordFormProps) => {
  const [showPw, setShowPw] = useState<PasswordFormFieldKeys[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
  } = useForm<ChangePasswordParams>({
    resolver: yupResolver(passwordSchema),
    mode: "all",
  })

  useEffect(() => {
    ;(document.querySelector(".form-input") as HTMLInputElement)?.focus()
  }, [])

  const onSubmitHandler = (data: ChangePasswordParams) => {
    onSubmit && onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {passwordFormFields.map((item, index) => (
        <div key={index} className="form-item">
          <label htmlFor={"password"} className="form-label">
            Mật Khẩu (*)
          </label>
          <div className="form-item">
            <div className="relative">
              <input
                className={`form-input ${errors?.[item.name] ? "form-input-err" : ""}`}
                id={item.name}
                type={showPw?.includes(item.name) ? "text" : "password"}
                placeholder={item.label}
                {...register(item.name, {
                  required: true,
                })}
              />

              <span
                onClick={() => {
                  if (showPw?.includes(item.name)) {
                    setShowPw([...showPw].filter((_) => _ !== item.name))
                  } else {
                    setShowPw([...(showPw || []), item.name])
                  }
                }}
                className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-[10px]"
              >
                {showPw?.includes(item.name) ? <EyeHideIcon /> : <EyeShowIcon />}
              </span>
            </div>
            {errors?.[item.name] || dirtyFields?.[item.name] ? (
              <p className="form-err-msg">{errors?.[item.name]?.message}</p>
            ) : null}
          </div>
        </div>
      ))}

      <div className="flex justify-center my-[40px]">
        <ButtonSubmit onClick={() => handleSubmit(onSubmitHandler)} isError={!isValid} />
      </div>
    </form>
  )
}
