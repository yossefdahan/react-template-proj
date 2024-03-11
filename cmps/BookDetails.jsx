const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { LongTxt } from "./LongTxt.jsx"
import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('Had issues loading book', err)
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function setColorPrice() {
        if (book.listPrice.amount > 150) {
            return 'high-price'
        } else if (book.listPrice.amount < 60) {
            return 'low-price'
        }
    }

    function setDisplayDate() {
        const dateNow = new Date().getFullYear()
        if ((dateNow - book.publishedDate) > 10) {
            return '- Vintage'
        } else if ((dateNow - book.publishedDate) <= 3) {
            return '- New'
        }
    }

    function SetDisplayPage() {
        if (book.pageCount > 500) {
            return 'Serious Reading'
        } else if (book.pageCount > 200 && pageCount < 500) {
            return 'Descent Reading'
        } else if (book.pageCount < 100) {
            return 'Light Reading'
        }
    }

    if (isLoading) return <div>Loading details..</div>
    return <section>
        <Link to="/book"><button>Go back</button></Link>

        <h2>{book.title}</h2>
        <img src={book.thumbnail} alt="photo" />
        <h3>Authors: {book.authors.join(' ')}</h3>
        <p>Categories: {book.categories.join(' ')}</p>
        <h4>Subtitle: {book.subtitle}</h4>
        <p>Language: {book.language}</p>
        {!book.pageCount && <p>Page count: {book.pageCount}  {SetDisplayPage()}</p>}
        <p>Published date: {book.publishedDate}  {setDisplayDate()}</p>

        <LongTxt book={book} length={length = 100} />

        <p>Price: <span className={setColorPrice()}> {book.listPrice.amount}</span><span>{book.listPrice.currencyCode}</span></p>

        <Link to={`/book/review/${book.id}`}><button>Reviews</button></Link>

    </section>


}