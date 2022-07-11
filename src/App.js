import './App.css'
import './scss/app.scss'
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import PizaBlock from "./components/PizzaBlock/PizaBlock";
import {useEffect, useState} from "react";


function App() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch('https://62cc4d0ca080052930a9357f.mockapi.io/items').then((response) => {
			return response.json();
		}).then((json) => {
			setItems(json);
		})
	}, [])
	//https://62cc4d0ca080052930a9357f.mockapi.io/items
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
						{
							items.map((obj) => (
								<PizaBlock key={obj.id} {...obj} />
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
