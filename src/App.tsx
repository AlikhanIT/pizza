import './App.css'
import './scss/app.scss'
import {
	Routes,
	Route,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import Home from './pages/Home'

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/'./pages/Cart'));

const NotFound = Loadable({
	loader: () => import(/* webpackChunkName: "NotFound"*/'./pages/NotFound'),
	loading:() => <div>Загрузка...</div>,
});

const App: React.FC = () => {
	return (
		<Suspense fallback={<div>Загрузка...</div>}>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path=':sortProperty/:activeCateg/:curPage' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Suspense>
	)
}

export default App
