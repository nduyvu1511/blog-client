import { SpinnerIcon } from "@/assets"
import { ProfileForm } from "@/components"
import { UserContainer } from "@/container"
import { UseProfile } from "@/hooks"
import { MainLayout } from "@/layout"
import { ProfileFormParams } from "@/models"

const Profile = () => {
  const { data: authorInfo, updateProfile } = UseProfile(true)

  const handleUpdateProfile = (data: ProfileFormParams) => {
    updateProfile(data, () => {})
  }

  return (
    <UserContainer>
      <section className="py-24">
        <div className="max-w-[550px] shadow-box p-24 w-full mx-auto rounded-[4px]">
          {authorInfo ? (
            <ProfileForm
              defaultValues={authorInfo}
              onSubmit={(data) => handleUpdateProfile(data)}
            />
          ) : (
            <div className="py-[40px] flex-center">
              <SpinnerIcon className="animate-spin" />
            </div>
          )}
        </div>
      </section>
    </UserContainer>
  )
}

Profile.Layout = MainLayout
export default Profile
