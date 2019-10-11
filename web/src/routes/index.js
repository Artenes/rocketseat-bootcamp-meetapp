import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import Meetup from '~/pages/Meetup';
import MeetupEdit from '~/pages/MeetupEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/meetup/:id" component={Meetup} exact isPrivate />
      <Route path="/meetup" component={MeetupEdit} exact isPrivate />
      <Route path="/meetup/:id/edit" component={MeetupEdit} exact isPrivate />
    </Switch>
  );
}
