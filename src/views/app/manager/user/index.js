import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const User = React.lazy(() =>
    import(/* webpackChunkName: "second" */ './user-list')
);
const UserDetail = React.lazy(() =>
    import(/* webpackChunkName: "second" */ './user-detail')
);
function UserPages({ match }) {
    return (
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/user-list`} />
                <Route
                    path={`${match.url}/user-list`}
                    render={props => <User {...props} />}
                />
                  <Route
                    path={`${match.url}/:id`}
                    render={props => <UserDetail {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}

export default UserPages