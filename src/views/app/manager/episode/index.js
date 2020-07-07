import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";

const Episode = React.lazy(() =>
    import(/* webpackChunkName: "second" */ './episode')
);

function EpisodePages({ match }) {
    return (
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
                <Route
                    path={`${match.url}/`}
                    render={props => <Episode {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}

export default EpisodePages