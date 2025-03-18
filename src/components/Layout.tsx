import { Link, Outlet } from 'react-router-dom'
import { Fragment, useState } from 'react'
import AuthStatus from './auth/Header'
import { Button, Drawer } from '@mui/material'

function Layout() {
  const [state, setState] = useState(false)

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState(!state)
  }

  const menu = () => (
    <ul>
      <li>
        <Link to="/math10">Plus/min to 10</Link>
      </li>
      <li>
        <Link to="/math20">Plus/min to 20</Link>
      </li>
    </ul>
  )

  return (
    <div>
      <div>
        <Fragment>
          <div>
            <AuthStatus />
            <Button onClick={toggleDrawer()}>menu</Button>
          </div>
          <Drawer anchor="left" open={state} onClose={toggleDrawer()}>
            {menu()}
          </Drawer>
        </Fragment>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
