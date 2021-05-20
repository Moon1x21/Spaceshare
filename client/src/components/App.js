import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import WritePage from "./views/WritePage/WritePage";
import WriteDetailPage from "./views/WriteDetailPage/WriteDetailPage";
import MyWritePage from './views/MyWritePage/MyWritePage';
import SideWrite from './views/WriteDetailPage/SideWrite';
import SitePage from './views/SitePage/SitePage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/writepage" component={Auth(WritePage, true)} />
          <Route exact path="/write/:writeId" component={Auth(WriteDetailPage,true)}/>
          <Route exact path="/mywrite" component={Auth(MyWritePage,true)}/>
          <Route exact path="/search" component={Auth(SitePage,null)}/>
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
