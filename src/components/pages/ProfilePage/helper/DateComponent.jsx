import React from "react";

export function DateComponent({ userData, setUserData }) {
  // helper for age
  function calculateMinDate() {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 70);
    return minDate.toISOString().split("T")[0];
  }

  function calculateMaxDate() {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);
    return maxDate.toISOString().split("T")[0];
  }
  return (
    <div className="form-row">
      <label htmlFor="birthDate">Birth Date</label>
      <input
        type="date"
        name="birthDate"
        id="birthDate"
        placeholder="birthDate"
        value={userData.birthDate}
        max={calculateMaxDate()}
        min={calculateMinDate()}
        onChange={(e) =>
          setUserData({ ...userData, birthDate: e.target.value })
        }
      />
    </div>
  );
}
