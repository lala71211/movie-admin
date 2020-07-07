import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const MovieList = React.lazy(() =>
    import(/* webpackChunkName: "movie-image-list" */ './MovieList')
);
const MovieDetail = React.lazy(() =>
    import(/* webpackChunkName: "movie-detail" */ './MovieDetail')
);
const MovieForm = React.lazy(() =>
    import(/* webpackChunkName: "forms-validations" */ './validations')
);
// const Details = React.lazy(() =>
//     import(/* webpackChunkName: "detail"*/ './details')
// )

function MoviePages({ match }) {
    return (
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/movie-list`} />
                <Route
                    path={`${match.url}/movie-list`}
                    render={props => <MovieList {...props} />}
                />
                <Route
                    path={`${match.url}/new-movie`}
                    render={props => <MovieForm {...props} />}
                />
                <Route
                    path={`${match.url}/:id`}
                    render={props => <MovieDetail {...props} />}
                />
                {/* <Route
                    path={`${match.url}/details-alt`}
                    render={props => <DetailsAlt {...props} />}
                /> */}
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}

export default MoviePages
