import React from "react";

export function GenderComponent({ userData, setUserData }) {
  return (
    <div className="form-row">
      <label>Gender</label>
      <div className="gender-holder">
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={userData.gender === "male"}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={userData.gender === "female"}
            onChange={(e) =>
              setUserData({ ...userData, gender: e.target.value })
            }
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
    </div>
  );
}
