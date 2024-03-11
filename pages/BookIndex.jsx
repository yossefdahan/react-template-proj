const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BooksList } from "../cmps/BooksList.jsx"

import { bookService } from "../services/book.service.js"


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    function onUpdateBook(bookToUpdate) {
        bookService.save(bookToUpdate)
            .then((savedBook) => {
                setBooks(prevBooks => prevBooks.map(book => book.id === savedBook.id ? savedBook : book))
            })
            .catch(err => {
                console.log('Had issues with updating book', err)
            })
    }

    if (!books) return <div>loading..</div>
    return <section className="book-index">

        <BookFilter
            onSetFilter={onSetFilter}
            filterBy={filterBy} />

        <Link to="/book/edit"><button>Add a book</button></Link>

        <BooksList books={books} onUpdateBook={onUpdateBook} />

    </section>
}