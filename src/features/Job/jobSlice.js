import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { JOBTYPE, STATUSOPT } from "../../utils/constant";
import { getUserFromLocalStorage } from "../../utils/localstorage";
import { logoutUser } from "../user/userSlice";
import { createJobThunk, editJobThunk, deleteJobThunk } from "./jobThunk";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",

  jobTypeOptions: JOBTYPE,
  jobType: "full-time",
  statusOptions: STATUSOPT,
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("/job/add-job", createJobThunk);

export const editJob = createAsyncThunk("/job/editJob", editJobThunk);

export const deleteJob = createAsyncThunk("/job/deleteJob", deleteJobThunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      console.log(state);
      state[name] = value;
    },

    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createJob.fulfilled, (state, action) => {
      state.isLoading = false;
      toast.success("Job Created");
    });
    builder.addCase(createJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
    builder.addCase(deleteJob.pending, (state, { payload }) => {});
    builder.addCase(deleteJob.fulfilled, (state, { payload }) => {
      toast.success(payload);
    });
    builder.addCase(deleteJob.rejected, (state, { payload }) => {
      toast.error(payload);
    });
    builder.addCase(editJob.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      toast.success(payload);
    });
    builder.addCase(editJob.rejected, (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    });
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
