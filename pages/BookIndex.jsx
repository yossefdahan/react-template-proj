const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BooksList } from "../cmps/BooksList.jsx"

import { bookService } from "../services/book.service.js"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"


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

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId))
                showSuccessMsg(`Book removed successfully (${bookId})`)
            })
            .catch((err) => {
                console.log('Had issues removing book', err)
                showErrorMsg(`Book removed successfully (${bookId})`)
            })
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

<div className="add-book-btn-container"> <Link to="/book/edit"><button className="add-book-btn">Add a book</button></Link></div>

        <BooksList books={books} onUpdateBook={onUpdateBook} onRemoveBook={onRemoveBook} />

    </section>
}