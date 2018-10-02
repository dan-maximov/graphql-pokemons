import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import createBrowserHistory from 'history/createBrowserHistory'

import Header from './Header'
import List from './List'
import Poke from './Poke'

const history = createBrowserHistory
const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" exact component={List} />
          <Route path="/:pokemon" exact component={Poke} />
        </Switch>
      </React.Fragment>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
