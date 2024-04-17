import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// my importations
import { ROOT_REDUCER_TYPE } from '../../redux/store'
import Layout from '../../components/common/layout/Layout'
import { routeConnected, routeNotConnected } from '../../utils/routes'

const RouterIndex = () => {
    let { connected } = useSelector((state: ROOT_REDUCER_TYPE) => state.admin)
    // connected = true

    return (
        <Router>
            <Routes>
                {connected ?
                    <Route path='/*'
                        element={
                            <Layout>
                                <Routes>
                                    {routeConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)}
                                    <Route path='*' element={<Navigate to='/' />} />
                                </Routes>
                            </Layout>
                        }
                    /> :
                    <>
                        {routeNotConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)}
                        <Route path='*' element={<Navigate to='/' />} />
                    </>
                }
            </Routes>
        </Router>
    )
}

export default RouterIndex