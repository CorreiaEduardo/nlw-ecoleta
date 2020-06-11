import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import ViewPoints from './pages/ViewPoints'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/criar-ponto" />
            <Route component={ViewPoints} path="/ver-pontos" />
        </BrowserRouter>
    );
}

export default Routes;