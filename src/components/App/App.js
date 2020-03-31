import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Items from '../Items/Items'
import Item from '../Item/Item'
import CreateItem from '../CreateItem/CreateItem'
import EditItem from '../EditItem/EditItem'

import Home from '../Home/Home'
class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items' render={() => (
            <Items msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id' render={({ match }) => (
            <Item msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id/edit' render={({ match }) => (
            <EditItem msgAlert={this.msgAlert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} path='/create-item' render={() => (
            <CreateItem msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <Home msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
        </main>
        <SignIn msgAlert={this.msgAlert} setUser={this.setUser} user={this.state.user}/>
      </Fragment>
    )
  }
}

export default App

// <Route path='/sign-in' render={() => (
//   <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
// )} />
