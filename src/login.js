import React from "react";
import "./login.css";
const Login = () => {
  const [data, setData] = React.useState({
    username: "",

    password: "",
  });

  const handleSubmit = () => {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const body = {
      username: data?.username,
      password: data?.password,
    };
    var requestOptions = {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify(body),
      headers: myHeaders,
    };
    fetch("http://localhost:8000/api/get_token/", requestOptions)
      .then((response) => response.text())
      .then(function (response) {
        let data = JSON.parse(response);
        console.log(data);
        console.log(data.token);
        if (data.token) {
          // const tempdata = list?.filter((i) => i.id !== ids);
          alert("Login Successfully");
          localStorage.setItem("token", data.token);
        } else {
          alert(response);
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="container">
      <div className="form-box">
        <div className="header-form">
          <h4 pxlassName="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: "110px" }}></i>
          </h4>
          px <div className="image"></div>
        </div>
        <div className="body-form">
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="textarea"
                style={{ width: "100%", height: "40px", margin: 6 }}
                placeholder="Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="text"
                className="textarea"
                style={{ width: "100%", height: "40px", margin: 6 }}
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="btn btn-secondary btn-block"
              style={{ width: "50%", height: "30px", margin: 6 }}
            >
              LOGIN
            </button>
            <div className="message">
              <div>
                <input type="checkbox" /> Remember ME
              </div>
              <div>
                <a href="#">Forgot your password</a>
              </div>
            </div>
          </form>
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
