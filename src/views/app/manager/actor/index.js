import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const Actor = React.lazy(() =>
    import(/* webpackChunkName: "second" */ './actor')
);
// const Edit = React.lazy(() =>
//     import(/* webpackChunkName:"second" */ './edit-actor'));
function ActorPages({ match }) {
    return (
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/actor-list`} />
                <Route
                    path={`${match.url}/actor-list`}
                    render={props => <Actor {...props} />}
                />
                  {/* <Route
                    path={`${match.url}/:id`}
                    render={props => <Edit {...props} />}
                /> */}
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}

export default ActorPages