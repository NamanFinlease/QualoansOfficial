import React, { useState } from "react";
import Dashboard from "./Dashboard"; // Assuming Dashboard is another component

const Login = () => {
  const [userName, setUserName] = useState('');

  // Handle login logic and fetch user data (including name)
  const handleLogin = async () => {
    const userData = await fetchUserDataByAadhaar(aadhaarNumber);  // Fetching user data after Aadhaar verification
    setUserName(userData.name); // Storing name after successful login
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {/* Pass userName to Dashboard */}
      <Dashboard profileImageUrl={userImageUrl} name={userName} />
    </div>
  );
};
