import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 0,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};
//this.jobs.length > 10 ? this.jobs.length / 10 :
export const getAllJobs = createAsyncThunk("/job/", async (_, thunkAPI) => {
  const { searchStatus, searchType, sort, search, page } =
    thunkAPI.getState().allJobs;
  /**&sort=${sort} */
  let url = `/job/?status=${searchStatus}&jobType=${searchType}&page=${page}&sort=${sort} `;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});
export const stats = createAsyncThunk("/job/stats", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/job/stats");
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

const allJobs = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilter: (state) => {
      return { ...state, ...initialFilterState };
    },
    handlePage: (state, { payload }) => {
      state.page = payload - 1;
    },
    resetPage: (state) => {
      state.page = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllJobs.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.jobs = payload.allJobs;
        state.numOfPages =
          payload.totalJobs > 10 ? Math.ceil(payload.totalJobs / 10) : 0;
        state.isLoading = false;
      })
      .addCase(getAllJobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(stats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(stats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(stats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});
export const {
  clearFilter,
  handleChange,
  showLoading,
  hideLoading,
  handlePage,
  resetPage,
} = allJobs.actions;

export default allJobs.reducer;
