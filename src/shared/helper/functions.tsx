import _ from "lodash"
import moment from "moment"
import { LatLng } from "use-places-autocomplete"
import { BASE64_READER_REGEX } from "./constants"

export const correctEmail = (value: string) => {
  ;/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export const correctPassword = (value: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(value)
}

export const isVietnamesePhoneNumberValid = (num: string) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(num)
}

export const checkNumberPhone = (number: string) => {
  ;/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)
}

export const onScrollBottom = (callBack: Function) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event)
    }
  }
}

export function isValidHttpUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end)
}

// hàm định dạng tiền việt nam
// export function formatMoneyVND(num: string) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
// }
export const FormatNumber = (money: number, separator = ",") => {
  if (!money) return "0"
  return (money + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator)
}

export const formatNumberDec = (nStr: string, decSeparate: string, groupSeparate: string) => {
  nStr += ""
  let x = nStr.split(decSeparate)
  let x1 = x[0]
  let x2 = x.length > 1 ? "." + x[1] : ""
  let rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + groupSeparate + "$2")
  }
  return x1 + x2
}
// hàm định dạng tiền việt nam

export function formatMoneyVND(num: number | string) {
  if (typeof num == "number") {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} VND`
  } else if (typeof num == "string") {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ`
  }
}

// export const translateDataToTree = (categories: Category[]) => {
//   if (!isArrayHasValue(categories)) return []

//   _(categories).forEach((f) => {
//     f.children = _(categories)
//       .filter((g) => g.parent_id === f.id)
//       .value()
//   })
//   return _(categories)
//     .filter((f) => !f.parent_id)
//     .value()
// }

export function formatNumberInput(value: string, separator = ",") {
  value += ""
  const list = value.split(".")
  const prefix = list[0].charAt(0) === "-" ? "-" : ""
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ""
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`
}

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export function isObjectHasValue(obj: any): boolean {
  return obj && _.isObject(obj) && Object.keys(obj).length > 0
}

export function isArrayHasValue(array: any): boolean {
  return array && _.isArray(array) && array.length > 0
}

export const getFromLocalStorage: any = (key: string) => {
  let value
  try {
    if (typeof window === undefined) return
    value = JSON.parse(window.localStorage.getItem(key) as any)
  } catch (error) {}
  return value
}

export const setToLocalStorage: any = (key: string, value: any) => {
  if (typeof window === undefined) return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getFromSessionStorage: any = (key: string) => {
  let value
  try {
    if (typeof window === undefined) return
    value = JSON.parse(window.sessionStorage.getItem(key) as any)
  } catch (error) {}
  return value
}

export const setToSessionStorage = (key: string, value: any) => {
  if (typeof window === undefined) return
  window.sessionStorage.setItem(key, JSON.stringify(value))
}

export function convertBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => resolve(fileReader.result)
    fileReader.onerror = (error) => reject(error)
  })
}

export function convertViToEn(str: string, toUpperCase = false) {
  str = str.toLowerCase()
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i")
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
  str = str.replace(/đ/g, "d")
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "") // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, "") // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str
}

// export const formatTimeType = (time: TIME_TYPE): string => {
//   switch (time) {
//     case "day":
//       return "ngày"
//     case "hour":
//       return "giờ"
//     case "minute":
//       return "phút"
//     case "month":
//       return "tháng"
//     case "second":
//       return "giây"
//     case "week":
//       return "tuần"
//     case "year":
//       return "năm"
//     default:
//       break
//   }
//   return "giây"
// }

// export const formatGroupTimeType = (date: GroupTimeType): string => {
//   const type = date.time_type

//   if (type === "date") {
//     return `${date.date_value}`
//   }

//   if (type === "day") {
//     return `${date.date_duration || 1} Ngày trước`
//   }

//   if (type === "today") {
//     return `${date.hour_value} Hôm nay`
//   }

//   if (type === "year") {
//     return `${date.date_value}`
//   }

//   if (type === "yesterday") {
//     return `${date.hour_value} Hôm qua`
//   }

//   return ""
// }

export const calculateElapsedTime = (timeCreated: string) => {
  const created = new Date(timeCreated).getTime()
  let periods: any = {
    year: 365 * 30 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
  }
  let diff = Date.now() - created

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key])
      return `${result} ${result === 1 ? key : key + "s"} ago`
    }
  }

  return "Just now"
}

export const toggleBodyOverflow = (status: "hidden" | "unset") => {
  const body = document.body
  if (body) {
    body.style.overflow = status
  }
}

export const getTimes = (): { label: string; value: string }[] => {
  var times = [],
    periods = ["Sáng", "Chiều"],
    hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    prop = null,
    hour = null,
    min = null

  for (prop in periods) {
    for (hour in hours) {
      for (min = 0; min < 60; min += 30) {
        const timeStr = ("0" + hours[hour]).slice(-2) + ":" + ("0" + min).slice(-2)

        times.push({
          label: timeStr + " " + periods[prop],
          value:
            periods[prop] === "Sáng"
              ? timeStr + ":00"
              : `0${Number(timeStr.slice(0, 2)) + 12}`.slice(-2) +
                ":" +
                timeStr.slice(3, 5) +
                ":00",
        })
      }
    }
  }

  return times
}

export const convertToEnNoSpaceAndSpecialCharacter = (address: string) => {
  return address.replace(/\W/g, "")
}

export const removeBase64Reader = (str: string) => str.replace(BASE64_READER_REGEX, "")

export const getProvinceName = (address: string): string => {
  const arr = address.split(",")
  if (arr?.length < 3) return ""

  return convertViToEn(arr[arr.length - 2])
    .replace("city", "")
    .replace(/\W/g, "")
    .replace(/[0-9]/g, "")
    .replace("thanhpho", "")
    .replace("tp", "")
}

export const lngLatToKms = ({ from, to }: { from: LatLng; to: LatLng }): number => {
  var R = 6371.071 // Radius of the Earth in miles
  var rlat1 = from.lat * (Math.PI / 180) // Convert degrees to radians
  var rlat2 = to.lat * (Math.PI / 180) // Convert degrees to radians
  var difflat = rlat2 - rlat1 // Radian difference (latitudes)
  var difflon = (to.lng - from.lng) * (Math.PI / 180) // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)
      )
    )
  return d
}

export const subtractDateTimeToNumberOfHour = (dateTime: string, hour: number): string => {
  return moment(dateTime).subtract(hour, "hours").format("YYYY-MM-DD HH:MM:SS")
}
