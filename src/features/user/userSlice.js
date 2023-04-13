import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localstorage";

let initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
};

export const register = createAsyncThunk("/auth", async (user, thunkAPI) => {
  try {
    console.log("reaching register");
    const response = await customFetch.post("/auth/", user);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const login = createAsyncThunk("/auth/login", async (user, thunkAPI) => {
  try {
    console.log("reaching Login");
    const response = await customFetch.post("/auth/login", user);

    console.log(response.data);
    return response.data;
  } catch (error) {
    toast.error();
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// export const Me = createAsyncThunk("/auth/me", async (user, thunkAPI) => {
//   try {
//     const res = await customFetch.get("/auth/me");
//     return res.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

export const updateUser = createAsyncThunk(
  "/user/update",
  async (user, thunkAPI) => {
    try {
      const res = await customFetch.patch("/user/update", user);

      return res.data;
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser());

        return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
      }
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    logoutUser: (state, { payload }) => {
      state.user = null;
      state.isSidebarOpen = false;

      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success(`Hello There ${payload.name}`);
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;

      toast.error(payload);
    });
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success(`Hello There ${payload.name}`);
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;

      addUserToLocalStorage(payload);
      toast.success("User Updated");
    });
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    // builder.addCase(Me.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(Me.fulfilled, (state, { payload }) => {
    //   state.isLoading = false;
    //   state.user = payload;
    //   addUserToLocalStorage(payload);
    //   toast.success(`Hello There ${payload.name}`);
    // });
    // builder.addCase(Me.rejected, (state, { payload }) => {
    //   state.isLoading = false;
    //   toast.error(payload);
    // });
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;

export default userSlice.reducer;
