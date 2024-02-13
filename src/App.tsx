import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import RouterIndex from './pages/router'
import { isTokenExpired } from './utils/functions'
import { _isAdminConnected } from './redux/actions/admin.action'
import Loading from './components/common/loading/Loading'
import { _getMarchand } from './redux/actions/marchand.action'
import { ROOT_REDUCER_TYPE } from './redux/store'

const App = () => {
  const { loadingAdmin } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
  const { loadingMarchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
  const dispatch = useDispatch<any>()

  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const email = localStorage.getItem('email')
    const expireIn = localStorage.getItem('expireIn')

    if (accessToken && email && expireIn) {
      if (isTokenExpired(new Date().getTime(), parseInt(expireIn, 10))) setIsConnected(false)
      else setIsConnected(true)
    } else setIsConnected(false)

    const timer = setTimeout(() => { setLoading(false) }, 500)

    return () => clearTimeout(timer)

  }, [])

  useEffect(() => {
    dispatch(_isAdminConnected(isConnected))
    dispatch(_getMarchand())
  }, [isConnected, dispatch])

  return (loading || loadingMarchand || loadingAdmin) ?
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Loading width='100' />
    </div> :
    <RouterIndex />
}

export default App