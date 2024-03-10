const { useState, useEffect } = React
import { BookDetails } from "../cmps/BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BooksList } from "../cmps/BooksList.jsx"
import { bookService } from "../services/book.service.js"


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query().then((books) => setBooks(books))
    }

    function onSelectedBook(book) {
        setSelectedBook(book)
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }


    if (!books) return <div>loading..</div>
    return <section className="book-index">

        {!selectedBook && <React.Fragment>
            <BookFilter
                onSetFilter={onSetFilter}
                filterBy={filterBy} />

            <BooksList
                books={books}
                onSelectedBook={onSelectedBook} />

        </React.Fragment>
        }
        {selectedBook && <BookDetails
            book={selectedBook}
            onGoBack={() => onSelectedBook(null)}
        />}
    </section>
}