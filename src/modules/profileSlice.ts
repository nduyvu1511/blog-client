import { AuthorRes } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

interface ProfileSlice {
  authorInfo: AuthorRes | undefined
}

const initialState: ProfileSlice = {
  authorInfo: undefined,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }: { payload: AuthorRes | undefined }) => {
      state.authorInfo = payload
    },
  },
})

export default profileSlice.reducer
export const { setProfile } = profileSlice.actions
