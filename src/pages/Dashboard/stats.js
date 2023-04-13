import { useEffect } from "react";
import { stats } from "../../features/allJobs/allJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import { StatsContainer, ChartsContainer, Loading } from "../../components";

function Stats() {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(stats());
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}

export default Stats;
