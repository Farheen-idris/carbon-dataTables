import React, { useDebugValue } from "react";
import { render } from "react-dom";
import Login from "./login";
import "carbon-components/css/carbon-components.min.css";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarAction,
  TableToolbarSearch,
  Button,
  setIconsList,
} from "carbon-components-react";
import { headerData } from "./sampleData";
import axios from "axios";
import check from "./images/check.png";
import checkdisable from "./images/check_disable.png";
import { ModalWrapper } from "carbon-components-react";
import uuid from "react-uuid";

const token = localStorage.getItem("token");
const App = () => {
  const [list, setList] = React.useState([]);
  const [dataLogin, setDataLogin] = React.useState({
    username: "",
    password: "",
  });

  React.useEffect(() => {
    if (token) {
      const timer = setTimeout(() => {
        localStorage.clear();
        alert("session expired");
        window.location.reload();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmitLogin = () => {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    const body = {
      username: dataLogin?.username,
      password: dataLogin?.password,
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

        if (data.token) {
          // const tempdata = list?.filter((i) => i.id !== ids);
          alert("Login Successfully");
          localStorage.setItem("token", data.token);
          window.location.reload();
        } else {
          alert(response);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  React.useEffect(() => {
    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 9d9545d9b99516ee6660102f4af27f5ce5309e25"
    );

    var requestOptions = {
      method: "GET",
      // mode: "no-cors",
      headers: myHeaders,
    };

    fetch("http://localhost:8000/api/users/", requestOptions)
      .then((response) => response.text())
      .then((result) => setList(JSON.parse(result).results))
      .catch((error) => console.log("error", error));
  }, [list]);
  const DeleteList = (rows) => {
    let ids = rows.map((list, i) => {
      return list.id;
    });
    console.log(ids);

    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 9d9545d9b99516ee6660102f4af27f5ce5309e25"
    );

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify({ user_ids: ids }),
      headers: myHeaders,
    };
    fetch("http://localhost:8000/api/users/_destroy/", requestOptions)
      .then((response) => response.text())
      .then(function (response) {
        if (response === "") {
          // const tempdata = list?.filter((i) => i.id !== ids);
          let res = list.filter((f) => !ids.includes(f));
          setList(res);
          console.log("tempdata", res);
        } else {
          alert(response);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = () => {
    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 9d9545d9b99516ee6660102f4af27f5ce5309e25"
    );

    myHeaders.append("Content-Type", "application/json");

    const body = {
      first_name: data?.first_name,
      last_name: data?.last_name,
      username: data?.username,
      email: data?.email,
      password: data?.password,
      password2: data?.password2,
    };
    var requestOptions = {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify(body),
      headers: myHeaders,
    };
    fetch("http://localhost:8000/api/users/", requestOptions)
      .then((response) => response.text())
      .then(function (response) {
        if (response.data) {
          // const tempdata = list?.filter((i) => i.id !== ids);
          alert(response);
        } else {
          alert(response);
        }
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const handleActivate = (rows) => {
    let ids = rows.map((list, i) => {
      return list.id;
    });
    console.log(ids);

    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 9d9545d9b99516ee6660102f4af27f5ce5309e25"
    );

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      // mode: "no-cors",
      body: JSON.stringify({ user_ids: ids }),
      headers: myHeaders,
    };
    fetch("http://localhost:8000/api/users/_activate/", requestOptions)
      .then((response) => response.text())
      .then(function (response) {
        if (response === "") {
          // const tempdata = list?.filter((i) => i.id !== ids);
          let res = list.filter((f) => !ids.includes(f));

          setList(res);
        } else {
          alert(response);
        }
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const handleDeactivate = (rows) => {
    let ids = rows.map((list, i) => {
      return list.id;
    });

    var myHeaders = new Headers();

    myHeaders.append(
      "Authorization",
      "Token 9d9545d9b99516ee6660102f4af27f5ce5309e25"
    );

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      body: JSON.stringify({ user_ids: ids }),
      headers: myHeaders,
    };
    fetch("http://localhost:8000/api/users/_deactivate/", requestOptions)
      .then((response) => response.text())
      .then(function (response) {
        if (response === "") {
          // const tempdata = list?.filter((i) => i.id !== ids);
          let res = list.filter((f) => !ids.includes(f));

          setList(res);
        } else {
          alert(response);
        }
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  if (!token) {
    return (
      <div className="container">
        <div className="form-box">
          <div className="header-form">
            <h4 pxlassName="text-primary text-center">
              <i
                className="fa fa-user-circle"
                style={{ fontSize: "110px" }}
              ></i>
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
                  value={dataLogin.username}
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, username: e.target.value })
                  }
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
                  value={dataLogin.password}
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                onClick={() => handleSubmitLogin()}
                className="btn btn-secondary btn-block"
                style={{
                  width: "50%",
                  height: "30px",
                  margin: 15,
                  backgroundColor: "blue",
                  color: "white",
                  fontSize: "20px",
                  marginLeft: "80px",
                }}
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <DataTable
        rows={list}
        headers={headerData}
        isSortable
        style={{ position: "relative", top: "-100px" }}
      >
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          onInputChange,
          selectedRows,
        }) => (
          <TableContainer title="Users">
            <ModalWrapper
              style={{ zIndex: 1, position: "absolute" }}
              buttonTriggerText="Add user"
              modalHeading="Add New User"
              passiveModal
            >
              <div>
                <div>
                  <p>First Name</p>
                  <input
                    type="text"
                    label="First_Name"
                    value={data?.first_name}
                    onChange={(e) =>
                      setData({ ...data, first_name: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <div>
                  <p>Last Name</p>

                  <input
                    type="text"
                    label="Last_Name"
                    value={data.last_name}
                    onChange={(e) =>
                      setData({ ...data, last_name: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <div>
                  <p>User Name</p>

                  <input
                    type="text"
                    label="User_Name"
                    value={data.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <div>
                  <p>Email</p>

                  <input
                    type="text"
                    label="Email"
                    value={data?.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <div>
                  <p>Password</p>

                  <input
                    type="password"
                    label="Password"
                    value={data?.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <div>
                  <p>Confirm Password</p>

                  <input
                    type="password"
                    label="Password2"
                    value={data?.password2}
                    onChange={(e) =>
                      setData({ ...data, password2: e.target.value })
                    }
                    underlineColor="black"
                  />
                </div>
                <Button
                  onClick={() => handleSubmit()}
                  style={{ padding: 10, marginTop: 30 }}
                  icon="text-box-check-outline"
                >
                  Save
                </Button>
              </div>
            </ModalWrapper>
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  // renderIcon={Delete}
                  onClick={() => DeleteList(selectedRows)}
                >
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  // renderIcon={Save}
                  onClick={() => handleActivate(selectedRows)}
                >
                  Activate
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  // renderIcon={Download}
                  onClick={() => handleDeactivate(selectedRows)}
                >
                  Deactivate
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TableToolbarSearch
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onChange={onInputChange}
                />
                <TableToolbarMenu
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                >
                  <TableToolbarAction
                    primaryFocus
                    onClick={() => alert("Alert 1")}
                  >
                    Action 1
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert("Alert 2")}>
                    Action 2
                  </TableToolbarAction>
                  <TableToolbarAction onClick={() => alert("Alert 3")}>
                    Action 3
                  </TableToolbarAction>
                </TableToolbarMenu>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.value === true ? (
                          <img
                            src={check}
                            alt="BigCo Inc. logo"
                            width={20}
                            height={20}
                          />
                        ) : cell.value === false ? (
                          <img
                            src={checkdisable}
                            alt="BigCo Inc. logo"
                            width={20}
                            height={20}
                          />
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    );
  }
};

render(<App />, document.getElementById("root"));
