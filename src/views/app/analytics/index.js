import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Analytics = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './analytics')
);
function AnalyticsPages({ match }) {
    return (
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/`} />
                <Route
                    path={`${match.url}`}
                    render={props => <Analytics {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}

export default AnalyticsPages
