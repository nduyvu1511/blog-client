import { useRouter } from "next/router"
import { useEffect } from "react"

const CheckingCheckoutStatusPage = () => {
  const route = useRouter()
  const { vnp_ResponseCode } = route.query

  useEffect(() => {
    if (!vnp_ResponseCode) return

    if (vnp_ResponseCode == "24") {
      route.replace('"http://cancel.sdk.merchantbackapp"')
    } else if (vnp_ResponseCode != "00") {
      route.replace("http://fail.sdk.merchantbackapp")
    } else if (vnp_ResponseCode == "00") {
      route.replace("http://success.sdk.merchantbackapp")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vnp_ResponseCode])

  return null
}

export default CheckingCheckoutStatusPage
