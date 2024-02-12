import { useState } from "react";

function useForceRerender() {
  const [rerenderIndex, setRerenderIndex] = useState(0);

  // Function to force rerender
  const forceRerender = () => {
    // Incrementing the state will cause the component to rerender
    setRerenderIndex((prevIndex) => prevIndex + 1);
  };

  return forceRerender;
}

export default useForceRerender;
