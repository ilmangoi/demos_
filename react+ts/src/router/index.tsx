import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes'

const RouteView = () => {
  let element = useRoutes(routes)
  return <>{element}</>
}

export default RouteView
