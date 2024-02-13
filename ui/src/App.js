import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
function App() {
  const [email, setEmail] = useState(""); // email field state variable is declared and assign with empty string...
  const [password, setPassword] = useState(""); //password state variable is declared and assign with empty string...
  const [error, setError] = useState(""); // to catch the errors either api or local...
  const [isLoading, setIsLoading] = useState(false); // used to when API is triggered
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {}, []);
  //Action on submit the login form...
  const triggerLoginAction = async (event) => {
    try {
      event.preventDefault();
      const postReqBody = {
        email: email,
        password: password,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(postReqBody),
      };
      console.log(requestOptions);
      const response = await fetch(
        "http://localhost:3001/login",
        requestOptions
      );

      if (!response.ok) {
        setError("Error in the API ...");
      }

      const result = await response.json();
      if (result.status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    } catch (err) {}
  };
  // this is used to update the corresponding values of their type
  const updateStateValues = (event, type) => {
    if (type === "email") {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  return (
    <div className="App">
      {!isSuccess ? (
        <form onSubmit={triggerLoginAction}>
          <p>
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => updateStateValues(e, "email")}
            />
          </p>
          <p>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => updateStateValues(e, "password")}
            />
          </p>
          <p>
            <button type="submit"> Login</button>
          </p>
        </form>
      ) : (
        <div> Welcome {email}</div>
      )}
    </div>
  );
}

export default App;
