function Categories(props){
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return(
        <div className='categories'>
            <ul>
                {
                    categories.map((value, index) => (
                        <li key={index} onClick={() => (props.onChangeCategory(index))} className={props.categoryIndex === index ? 'active' : ''}>{value}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories