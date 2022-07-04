import { ImageSingleFile } from "@/components"
import { categoryFormSchema } from "@/core/schema"
import { categoryFormFields, convertViToEn } from "@/helper"
import { CategoryModel, OptionModel } from "@/models"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"

interface CategoryFormProps {
  defaultValues?: CategoryModel
  onSubmit: (params: CategoryModel) => void
  categoryOptions?: OptionModel[]
  mode?: "create" | "update"
}

export const CategoryForm = ({
  onSubmit,
  categoryOptions,
  defaultValues,
  mode = "create",
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    control,
  } = useForm<CategoryModel>({
    resolver: yupResolver(categoryFormSchema),
    mode: "all",
  })

  const [image, setImage] = useState<string>("")

  const onSubmitHandler = (data: CategoryModel) => {
    onSubmit &&
      onSubmit({
        ...data,
        slug: convertViToEn(data.slug.trim().toLowerCase()).replace(/\s+/g, "-"),
      })
  }

  return (
    <form className="form-control" onSubmit={handleSubmit(onSubmitHandler)}>
      {categoryFormFields.map((field) => (
        <div key={field.name} className="form-item">
          <label htmlFor={field.name} className="form-label">
            {field.label} {field.isRequired ? "(*)" : ""}
          </label>

          {field.type === "file" ? (
            <Controller
              control={control}
              name={field.name}
              render={({ field: { onChange } }) => (
                <div className="driver-bio__form-input">
                  <ImageSingleFile
                    folder="category_images"
                    id={field.name}
                    image={image || defaultValues?.image}
                    isError={!!errors?.[field.name]?.message}
                    getImage={(img) => {
                      setImage(img.url)
                      onChange(img.url)
                    }}
                  />
                </div>
              )}
              rules={{ required: true }}
            />
          ) : null}

          {field.type === "text" ? (
            <input
              className={`form-textarea ${errors?.[field.name] ? "form-input-err" : ""}`}
              id={field.name}
              defaultValue={defaultValues?.[field.name]}
              placeholder={field.label}
              {...register(field.name, {
                required: true,
              })}
            />
          ) : null}

          {field.type === "select" ? (
            <div className="form-select">
              <Controller
                control={control}
                name={field.name}
                render={({ field: { onChange, onBlur } }) => (
                  <Select
                    defaultValue={categoryOptions?.find(
                      (item) => item.value === defaultValues?.parentId
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
          {mode === "create" ? "Tạo mới" : "Chỉnh sửa"}
        </button>
      </div>
    </form>
  )
}
