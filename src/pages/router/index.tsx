import React from 'react'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
// my importations
import { routeConnected, routeNotConnected } from '../../utils/routes'
import Layout from '../../components/common/layout/Layout'

const RouterIndex = () => {
    let connected = true

    return (
        <Router basename='/marchand'>
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
                    /> : routeNotConnected.map((route, i) => <Route key={i} path={route.path} element={<route.Element />} />)
                }
            </Routes>
        </Router>
    )
}

export default RouterIndex