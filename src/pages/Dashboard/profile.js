import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../components";
import { updateUser } from "../../features/user/userSlice";

function Profile() {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;

    if (!name || !email || !lastName || !location) {
      toast.error("Please Fill Out All Field");
      return;
    }
    dispatch(updateUser(userData));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            handlechange={handlechange}
            value={userData.name}
          />
          <FormRow
            name="email"
            type="text"
            handlechange={handlechange}
            value={userData.email}
          />
          <FormRow
            name="lastName"
            labelText="last name"
            type="text"
            handlechange={handlechange}
            value={userData.lastName}
          />
          <FormRow
            name="location"
            type="text"
            handlechange={handlechange}
            value={userData.location}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save Changes"}{" "}
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default Profile;
