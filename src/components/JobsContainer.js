import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/JobsContainer";
import {
  getAllJobs,
  handlePage,
  resetPage,
} from "../features/allJobs/allJobsSlice";
import Job from "./Job";
import Loading from "./Loading";

import ResponsivePagination from "react-responsive-pagination";

function JobsContainer() {
  const {
    isLoading,
    jobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
    page,
  } = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (search || searchStatus || searchType) {
      dispatch(resetPage());
    }
    dispatch(getAllJobs());
  }, [search, searchStatus, searchType, sort, page]);

  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  const pageHandler = (page) => {
    dispatch(handlePage(page));
  };

  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      <ResponsivePagination
        current={page}
        total={numOfPages}
        onPageChange={(page) => pageHandler(page)}
      />
    </Wrapper>
  );
}

export default JobsContainer;
