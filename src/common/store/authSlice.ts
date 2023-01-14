import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type StateType = {
  isLoggedIn: boolean;
  username: string;
  authToken: string;
  tokenExpiration: number;
};

const initialState: StateType = {
  isLoggedIn: false,
  username: "",
  authToken: "",
  tokenExpiration: 0,
};

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (next: () => void, { dispatch, getState }) => {
    const { authSlice } = getState() as any;

    if (Date.now() > authSlice.tokenExpiration) {
      try {
        const res = await fetch("api/auth/renew-token", {
          method: "GET",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.success) {
          dispatch(setAuthToken({ ...data.tokenData }));
          return next();
        } else {
          dispatch(logoutHandler());
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    return next();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    logoutHandler: (state) => {
      console.log("please");
      state.username = "";
      state.isLoggedIn = false;
      state.authToken = "";
      state.tokenExpiration = 0;
    },
    setAuthToken: (
      state,
      action: PayloadAction<{ token: string; expiration: number }>
    ) => {
      state.authToken = action.payload.token;
      state.tokenExpiration = action.payload.expiration;
    },
  },
});

export const { loginHandler, logoutHandler, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
