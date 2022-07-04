// Regex
export const DEFAULT_LIMIT_PRODUCT = 24
export const PHONE_SCHEMA = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/
export const BIRTHDAY_SCHEMA = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
export const STRING_AT_LEAST_TWO_CHARACTER = /^[a-z]+(?:\s[a-z]+)+$/
export const PASSWORD_SCHEMA = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
export const DATE_SCHEMA = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
export const BASE64_REGEX = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
export const VIETNAMESE_NAME =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/
export const YEAR_SCHEMA = /^(19|20)\d{2}$/
export const DATE_REGEX =
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
export const BASE64_READER_REGEX = /^data:image\/\w+;base64,/
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const FORM_LOGIN_KEY = "login_form"
