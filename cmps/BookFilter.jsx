const { useState, useEffect } = React

export function BookFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = target.checked
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
    }




    return <section className="filter-container">
        <h2>filter Books</h2>

        <form onSubmit={onFilter}>

            <label htmlFor="title">Title:</label>
            <input type="text"
                id="title"
                name="title"
                value={filterByToEdit.title}
                onChange={handleChange}
                placeholder="by title" />

            <label htmlFor="price"> Min price:</label>
            <input type="number"
                id="price"
                name="price"
                value={filterByToEdit.price}
                onChange={handleChange}
                placeholder="by min price" />

            <label htmlFor="isOnSale"> On sale:</label>
            <input type="checkbox"
                id='isOnSale'
                onChange={handleChange}
                value={filterByToEdit.isOnSale}
                name="isOnSale" />
            <button>Filter</button>
        </form>

    </section>
}