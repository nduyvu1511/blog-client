import { LayoutProps } from "@/models"
import { App } from "../app"

export const EmptyLayout = ({ children }: LayoutProps) => {
  return <App>{children}</App>
}
