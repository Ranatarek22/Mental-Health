import React from "react";
import { useNavigation } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigation();
  navigate("/createforum");
  return <div>UserProfile</div>;
};

export default ProfilePage;
