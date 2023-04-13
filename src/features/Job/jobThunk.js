// import authHeader from "../../utils/authHeader";
import customFetch from "../../utils/axios";

import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post(
      "job/add-job",
      job
      // authHeader(thunkAPI)
    );
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobID, job }, thunkAPI) => {
  try {
    console.log(job, "job", "jobID", jobID);
    const updatedJob = await customFetch.put(
      `/job/editJob/${jobID}`,
      job
      // authHeader(thunkAPI)
    );
    thunkAPI.dispatch(clearValues());

    return updatedJob.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return;
    }
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
};

export const deleteJobThunk = async (jobID, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const resp = await customFetch.delete(
      `/job/deleteJob/${jobID}`
      // authHeader(thunkAPI)
    );
    thunkAPI.dispatch(hideLoading());
    thunkAPI.dispatch(getAllJobs());

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
};
