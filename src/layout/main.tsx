import { LogoIcon } from "@/assets"
import { Sidebar } from "@/components"
import { ReactNode } from "react"
import { Auth } from "./app/auth"

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Auth>
      <section className="">
        <div className="grid grid-cols-main-container">
          <div className="overflow-y-auto scrollbar-hide">
            <div className="fixed bottom-0 top-0 bg-[#DCEBF8] left-0 h-screen w-sidebar-width">
              <div className="p-[24px]">
                <LogoIcon />
              </div>
              <div className="px-24">
                <Sidebar />
              </div>
            </div>
          </div>
          <div className="">{children}</div>
        </div>
      </section>
    </Auth>
  )
}

export { MainLayout }
