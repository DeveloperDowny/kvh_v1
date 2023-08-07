import { createSlice } from "@reduxjs/toolkit";

const siteCustom = createSlice({
  name: "site_custom",
  initialState: {
    shouldShowBars: true,
    // shouldShowSideBar: true,
    shouldShowSideBar: true,
    navbarTitle: "",
    userRole: "USER", // Assuming UserRole.USER is a string constant
  },
  reducers: {
    setShouldShowSideBar: (state, action) => {
      state.shouldShowSideBar = action.payload;
    },

    setShouldShowBars: (state, action) => {
      state.shouldShowBars = action.payload;
    },
    setNavbarTitle: (state, action) => {
      state.navbarTitle = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
      console.log("state.userRole", state.userRole);
    },
  },
});

export const siteCustomReducer = siteCustom.reducer;
export const {
  setShouldShowBars,
  setShouldShowSideBar,
  setNavbarTitle,
  setUserRole,
} = siteCustom.actions;
