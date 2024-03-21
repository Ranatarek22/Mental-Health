import React from "react";

export function ImageComponent({ setUserData, userData }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData((prevUserData) => ({
        ...prevUserData,
        image: reader.result,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="form-row image">
      {userData.image ? (
        <label htmlFor="image" className="image">
          <img
            src={userData.image}
            alt="image placeholder"
            width={80}
            height={80}
            className="user-image"
          />
          <p>Update Photo</p>
        </label>
      ) : (
        <>
          <label htmlFor="image" className="image-label">
            <img
              src={"/user.png"}
              alt="image placeholder"
              width={40}
              height={40}
            />
          </label>
          <p>Select Photo</p>
        </>
      )}

      <input
        type="file"
        id="image"
        name="image"
        accept=".png ,.jpg ,.jpeg"
        onChange={handleImageChange}
      />
    </div>
  );
}
