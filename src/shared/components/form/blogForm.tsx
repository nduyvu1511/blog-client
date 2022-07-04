import { ImageSingleFile } from "@/components"
import { blogFormSchema } from "@/core/schema"
import { blogFormFields } from "@/helper"
import { BlogFormParams, OptionModel } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface BlogFormProps {
  defaultValues?: BlogFormParams
  onSubmit: (params: BlogFormParams) => void
  categoryOptions: OptionModel[]
  mode?: "update" | "create"
}

export const BlogForm = ({
  onSubmit,
  defaultValues,
  categoryOptions,
  mode = "create",
}: BlogFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<BlogFormParams>({
    resolver: yupResolver(blogFormSchema),
    mode: "all",
    defaultValues,
  })

  const [image, setImage] = useState<string>("")

  const onSubmitHandler = (data: BlogFormParams) => {
    onSubmit && onSubmit(data)
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {blogFormFields.map((field) => (
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
                    image={image || defaultValues?.thumbnail}
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
            <textarea
              className={`form-textarea ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
              rows={1}
              defaultValue={defaultValues?.[field.name]}
            ></textarea>
          ) : null}

          {field.type === "select" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={categoryOptions.find(
                      (item) => item.value === defaultValues?.categoryId
                    )}
                    placeholder={field.label}
                    options={categoryOptions}
                    onChange={(val) => val?.value && onChange(val.value)}
                    onBlur={onBlur}
                    id={field.name}
                    className={`${errors?.[field.name] ? "form-select-error" : ""}`}
                  />
                )}
                rules={{ required: true }}
              />
            </div>
          ) : null}

          {errors[field.name] || dirtyFields[field.name] ? (
            <p className="form-err-msg">{errors[field.name]?.message}</p>
          ) : null}
        </div>
      ))}
      <div className="mb-[100px]"></div>

      <div className="flex-center py-[10px] absolute left-0 right-0 bottom-0 bg-white-color">
        <button className={`btn-primary ${!isValid ? "btn-disabled" : ""}`}>
          {mode === "create" ? "Tạo mới" : "Cập nhật"}
        </button>
      </div>
    </form>
  )
}
