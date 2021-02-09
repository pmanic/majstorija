import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import { setCurrentUser } from "./redux/actions/authActions";
import { logoutUser } from "./redux/actions/authActions";

import Toolbar from "./components/toolbar/toolbar";
import SideDrawer from "./components/toolbar/sideDrawer";
import Backdrop from "./components/toolbar/backdrop";
import Home from "./pages/Home";
import Login from "./components/login/login";
import Register from "./components/login/register";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Repairman from "./pages/Repairman";
import RepairmanProfile from "./components/repairman-components/profil/repairmanProfile";
import RateZahtev from "./components/user-components/rateZahtev";
import SendZahtev from "./components/user-components/sendZahtev";
import acceptOrDeclineForm from "./components/repairman-components/zahtevi/acceptOrDeclineForm";
import Error401 from "./pages/Error401";
import Error404 from "./pages/Error404";
//import Error404 from "./pages/Error404";
import "./style/App.scss";
import setAuthToken from "./redux/utils/setAuthToken";
import axios from "axios";

//Proveravamo sa svakim ucitavanjem stranice da li je user logovan ili nije
//Check for token
if (localStorage.jwtToken) {
  //ako postoji jwtToken postavi auth token header
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); //sa dispatch mozemo da zovemo koji god action

  //Proveravamo token da li je istekao
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        window.location.href = "/login";
        store.dispatch(logoutUser());
      }
    }
  );
}

class App extends React.Component {
  state = {
    sideDrawerOpen: false,
    sideDrawerUserOpen: false,
    sideDrawerAdminOpen: false,
    sideDrawerRepairmanOpen: false,
  };

  drawerBurgerClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  drawerBurgerUserClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerUserOpen: !prevState.sideDrawerUserOpen };
    });
  };

  drawerBurgerAdminClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerAdminOpen: !prevState.sideDrawerAdminOpen };
    });
  };

  drawerBurgerRepairmanClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerRepairmanOpen: !prevState.sideDrawerRepairmanOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false,
      sideDrawerUserOpen: false,
      sideDrawerAdminOpen: false,
      sideDrawerRepairmanOpen: false,
    });
  };
  render() {
    let backdrop;
    if (
      this.state.sideDrawerOpen ||
      this.state.sideDrawerUserOpen ||
      this.state.sideDrawerAdminOpen ||
      this.state.sideDrawerRepairmanOpen
    ) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div style={{ height: "100%" }}>
            <Route
              exact
              path="/"
              render={() => (
                <Toolbar
                  drawerClickHandler={this.drawerBurgerClickHandler}
                ></Toolbar>
              )}
            ></Route>

            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropClickHandler}
            />
            <SideDrawer
              showUser={this.state.sideDrawerUserOpen}
              click={this.backdropClickHandler}
            />
            <SideDrawer
              showAdmin={this.state.sideDrawerAdminOpen}
              click={this.backdropClickHandler}
            />
            <SideDrawer
              showRepairman={this.state.sideDrawerRepairmanOpen}
              click={this.backdropClickHandler}
            />
            {backdrop}

            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route
                path="/admin"
                render={() => (
                  <Admin
                    drawerClickHandler={this.drawerBurgerAdminClickHandler}
                  ></Admin>
                )}
              ></Route>
              {/* <Route exact path="*" component={Error404}></Route> */}
              <Route exact path="/autherror" component={Error401}></Route>
            </Switch>

            <Route
              path="/repairman"
              render={() => (
                <Repairman
                  drawerClickHandler={this.drawerBurgerRepairmanClickHandler}
                ></Repairman>
              )}
            ></Route>
            <Route
              path="/user"
              render={() => (
                <User
                  drawerClickHandler={this.drawerBurgerUserClickHandler}
                ></User>
              )}
            ></Route>

            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>

            <Route
              path="/user/search/repairmanprofile/:handle"
              component={RepairmanProfile}
            ></Route>
            <Route
              path="/repairman/repairmanprofile/:handle"
              component={RepairmanProfile}
            ></Route>
            <Route
              path="/user/history/raterequest/:handle"
              component={RateZahtev}
            ></Route>
            <Route
              path="/user/search/sendrequest/:handle"
              component={SendZahtev}
            ></Route>
            <Route
              path="/repairman/newreq/acceptordecline"
              component={acceptOrDeclineForm}
            ></Route>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
