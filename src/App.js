import logo from './logo.svg'
import './App.css'

import './scss/app.scss'
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizaBlock from "./components/PizzaBlock/PizaBlock";

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						<PizaBlock title='Мексиканская' price='500'/>
						<PizaBlock title='Мексиканская' price='500'/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
