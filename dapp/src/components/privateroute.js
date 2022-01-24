import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from './navbar'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const address = sessionStorage.getItem("address")
    return (
        <>
            <Navbar/>
            <Route
                {...rest}
                render={(props) => (
                    address ? 
                    <Component {...props} />
                    : <Redirect to={{
                        pathname: "/",
                        state: { from: props.location },
                    }}
                />
                )}
            />
        </>
    );
};

export default PrivateRoute
