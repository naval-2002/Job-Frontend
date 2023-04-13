import Wrapper from "../assets/wrappers/SearchContainer";
import { useDispatch, useSelector } from "react-redux";
import FormRowSelect from "./FormRowSelect";
import FormRow from "./FormRow";
import { clearFilter, handleChange } from "../features/allJobs/allJobsSlice";

function SearchContainer() {
  const { search, searchStatus, isLoading, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const dispatch = useDispatch();

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (isLoading) return;
    dispatch(handleChange({ name: name, value: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(clearFilter());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            name="search"
            value={search}
            handlechange={handleSearch}
            type="text"
          />
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            clear filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
