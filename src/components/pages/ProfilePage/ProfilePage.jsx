import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { apiInstance } from "../../../axios";
import { ImageComponent } from "./helper/ImageComponent";
import { GenderComponent } from "./helper/GenderComponent";
import { DateComponent } from "./helper/DateComponent";
const ProfilePage = () => {
  const [userData, setUserData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    image: "",
    gender: "",
  });
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("mental_auth"));
    const fetchData = async () => {
      const response = await apiInstance.get(`/users/${userToken.userId}`);
      const fetchedData = response.data;
      setUserData({
        email: fetchedData.email,
        firstName: fetchedData.firstName,
        lastName: fetchedData.lastName,
        image: fetchedData.photoUrl,
        birthDate: fetchedData.birthDate,
        gender: fetchedData.gender,
      });
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create FormData
    const formData = new FormData();
    formData.append("FirstName", e.target.elements.firstName.value);
    formData.append("LastName", e.target.elements.lastName.value);
    formData.append("BirthDate", e.target.elements.birthDate.value);
    formData.append("Gender", e.target.elements.gender.value);
    formData.append("Photo", e.target.elements.image.files[0]);

    try {
      // getting userId
      const userToken = JSON.parse(localStorage.getItem("mental_auth"));
      const response = await apiInstance.put(
        `/users/${userToken.userId}`,
        formData
      );
      toast.success("profile updated successfully");
      // update the token data
      const newToken = {
        ...userToken,
        photoUrl: response.data.photoUrl,
        userName: `${response.data.firstName} ${response.data.lastName}`,
      };
      localStorage.setItem("mental_auth", JSON.stringify(newToken));
    } catch (error) {
      toast.error("something went wrong try again!");
    }
  };

  return (
    <div className="profile-card">
      <div className="">
        <div className="">
          <h2>Profile Setting</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <ImageComponent setUserData={setUserData} userData={userData} />
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input
                required
                readOnly
                type="email"
                value={userData.email}
                placeholder="example@gmail.com"
                disabled
                className="email"
              />
            </div>
            <div className="form-row name">
              <div className="">
                <label htmlFor="firstName">First Name</label>
                <input
                  required
                  minLength={2}
                  maxLength={20}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={userData.firstName}
                  placeholder="firstName"
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="">
                <label htmlFor="firstName">Last Name</label>
                <input
                  required
                  minLength={2}
                  maxLength={20}
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="lastName"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <DateComponent userData={userData} setUserData={setUserData} />
            <GenderComponent userData={userData} setUserData={setUserData} />
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
