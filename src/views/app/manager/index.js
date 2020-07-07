import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Users = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './user')
);
const GenreList = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './genre')
);
const Movies = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './movie')
);
const Actors = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './actor')
);
const Episodes = React.lazy(() =>
    import(/* webpackChunkName: "second" */ './episode')
);

const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/genres`} />
      <Route
        path={`${match.url}/genres`}
        render={props => <GenreList {...props} />}
      />
      <Route
        path={`${match.url}/movies`}
        render={props => <Movies {...props} />}
      />
      <Route
        path={`${match.url}/users`}
        render={props => <Users {...props} />}
      />
      <Route
        path={`${match.url}/actors`}
        render={props => <Actors {...props} />}
      />
      <Route
        path={`${match.url}/episodes`}
        render={props => <Episodes {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
