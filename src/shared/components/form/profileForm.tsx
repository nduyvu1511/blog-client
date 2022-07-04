import { ImageSingleFile } from "@/components"
import { profileSchema } from "@/core/schema"
import { profileFormFields } from "@/helper"
import { ProfileFormParams } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

interface ProfileFormProps {
  defaultValues?: ProfileFormParams
  onSubmit: (params: ProfileFormParams) => void
}

export const ProfileForm = ({ onSubmit, defaultValues }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid, isDirty },
    control,
  } = useForm<ProfileFormParams>({
    resolver: yupResolver(profileSchema),
    mode: "all",
    defaultValues,
  })

  const [image, setImage] = useState<string>("")

  const onSubmitHandler = (data: ProfileFormParams) => {
    onSubmit && onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {profileFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label}{" "}
          </label>

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange } }) => (
                <div className="driver-bio__form-input">
                  <ImageSingleFile
                    folder="blog_images"
                    id={field.name}
                    image={image || defaultValues?.avatar}
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      onChange(img.url)
                      setImage(img.url)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "text" ? (
            <input
              readOnly={field.name === "email"}
              className={`form-textarea ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
              defaultValue={defaultValues?.[field.name]}
            />
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}

      <div className="flex-center mt-[40px]">
        <button className={`btn-primary ${!isValid && isDirty ? "btn-disabled" : ""}`}>
          Cập nhật
        </button>
      </div>
    </form>
  )
}
