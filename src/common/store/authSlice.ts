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
          dispatch(loginHandler(data.username));
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

export const logoutHandler = createAsyncThunk("auth/logoutAPI", async () => {
  try {
    const res = await fetch("api/auth/logout", {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data.success;
  } catch (error) {
    console.debug(error);
    return false;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginHandler: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.username = action.payload;
    },
    setAuthToken: (
      state,
      action: PayloadAction<{ token: string; expiration: number }>
    ) => {
      state.authToken = action.payload.token;
      state.tokenExpiration = action.payload.expiration;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutHandler.fulfilled, (state, payload) => {
      state.username = "";
      state.isLoggedIn = false;
      state.authToken = "";
      state.tokenExpiration = 0;
      if (!payload) console.warn("Could not delete Auth Token");
    });
  },
});

export const { loginHandler, setAuthToken } = authSlice.actions;

export default authSlice.reducer;
