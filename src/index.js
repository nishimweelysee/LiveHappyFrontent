import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './components/styles/style2.css'
import { Router, Route, Switch } from "react-router-dom";
import HomeV1 from './components/home-v1';
import PropertyDetails from './components/property-details';
import PropertyGrid from './components/property-grid';
import Property from './components/property';
import About from './components/about';
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import AddProperty from './components/landlord/add-property';
import Contact from './components/contact';
import Counter from './components/CounterFile';
import Find from './components/Find'
//Redux
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import store from './redux/store';
import loadAuthStatus from './middleware/loadAuthState';
//Dashboard
import axiosConfig from './config/axios';
import path from 'path';
import dotenv from 'dotenv';
import WelcomeDash from "./components/landlord/welcomeDash";
import MyHouses from "./components/landlord/myHouses";
import MyTenants from "./components/landlord/myTenants";
import MyIncome from "./components/landlord/myIncome";
import MyRequests from "./components/landlord/myRequests";
import ProtectedRoute from "./middleware/protectRoute";
import WelcomeAdmin from "./components/admin/WelcomeAdmin";
import Categories from "./components/admin/Categories";
import WelcomeTenant from "./components/tenant/welcomeTenant";


import MyHousesT from "./components/tenant/myHousesT";
import MyRequestsT from "./components/tenant/myRequestsT";
import Contracts from "./components/landlord/contracts";
import MyContracts from "./components/landlord/myContracts";
import MyContractsT from "./components/tenant/myContractsT";
import MyPayments from "./components/tenant/myPayments";
import Invoice from "./components/global-components/Invoice";
import Houses from "./components/Houses";
import Users from "./components/admin/users";
import Profile from "./components/Profile";
import UserContextProvider from "./context/UserContextProvider";

const history = createBrowserHistory();
dotenv.config({ path: path.join(__dirname, '../.env') });


axiosConfig();
class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <UserContextProvider>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={HomeV1} />
                            <Route path="/property-details" component={PropertyDetails} />
                            <Route path="/property-grid" component={PropertyGrid} />
                            <Route path="/houses" component={Houses} />
                            <Route path="/property" component={Property} />
                            <Route path="/about" component={About} />
                            <Route path="/sign-in" component={SignIn} />
                            <Route path="/sign-up" component={SignUp} />
                            <Route path="/contact" component={Contact} />
                            <Route path={"/find"} component={Find} />

                            { /*Admin Dashboard*/}

                            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} exact path="/admin" component={WelcomeAdmin} />
                            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} exact path="/admin/users" component={Users} />
                            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]} exact path="/admin/category" component={Categories} />

                            { /*LandLord Dashboard*/}

                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord" component={WelcomeDash}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/add-property" component={AddProperty} />
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/house" component={AddProperty}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/my-house" component={MyHouses}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/tenant" component={MyTenants}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/income" component={MyIncome}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/contracts" component={MyContracts}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/request/:status"  component={MyRequests}/>
                            <ProtectedRoute allowedRoles={["ROLE_LANDLORD"]} exact path="/landlord/send/contract"  component={Contracts}/>

                            {/*Tenants Dashboard*/}
                            <ProtectedRoute allowedRoles={["ROLE_TENANT"]} exact path="/tenant" component={WelcomeTenant} />
                            <ProtectedRoute allowedRoles={["ROLE_TENANT"]} exact path="/tenant/my-house" component={MyHousesT}/>
                            <ProtectedRoute allowedRoles={["ROLE_TENANT"]} exact path="/tenant/request/:status"  component={MyRequestsT}/>
                            <ProtectedRoute allowedRoles={["ROLE_TENANT"]} exact path="/tenant/contracts" component={MyContractsT}/>
                            <ProtectedRoute allowedRoles={["ROLE_TENANT"]} exact path="/tenant/payments" component={MyPayments}/>

                            <Route path="/counter" component={Counter} />


                            <ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_LANDLORD","ROLE_TENANT"]} exact path="/report" component={Invoice} />
                            <ProtectedRoute allowedRoles={["ROLE_ADMIN","ROLE_LANDLORD","ROLE_TENANT"]} exact path="/profile" component={Profile} />
                        </Switch>
                    </Router>
                </UserContextProvider>
            </Provider>
        )
    }
}

export default Root;
loadAuthStatus().then(() => {
    ReactDOM.render(<Root />, document.getElementById('livehappy'));
});
