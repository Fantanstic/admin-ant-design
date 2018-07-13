import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/login.html',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },{
      path: '/main.html',
      models: () => [import('./models/orderSettings')],
      component: () => import('./routes/order-settings/'),
    },{
      path: '/cash.html',
      models: () => [import('./models/cashApply')],
      component: () => import('./routes/cash-apply/'),
    },{
      path: '/member.html',
      models: () => [import('./models/member')],
      component: () => import('./routes/member/'),
    },{
      path: '/credit-cash.html',
      models: () => [import('./models/creditCash')],
      component: () => import('./routes/credit-cash/'),
    },{
      path: '/data-analysis.html',
      models: () => [import('./models/dataAnalysis')],
      component: () => import('./routes/data-analysis/'),
    },{
      path: '/ip-lookup.html',
      models: () => [import('./models/ipLookup')],
      component: () => import('./routes/ip-lookup/'),
    },{
      path: '/exceptionLogin.html',
      models:()=>[import('./models/exceptionLogin')],
      component:()=> import('./routes/exceptionLogin'),
      },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/login.html" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
