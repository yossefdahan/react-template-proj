const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx"



export function BooksList({ books, onUpdateBook }) {


    function onChangePrice(book) {
        console.log(book);
        book = { ...book, listPrice: { ...book.listPrice, amount: book.listPrice.amount + 10 } }
        onUpdateBook(book)
    }


    
    if (!books.length) return <div>No Books Found..</div>
    return <ul>
        {
            books.map(book => <li key={book.id}>
                <Link to={`/book/${book.id}`}>
                    <BookPreview book={book} />
                </Link>
                <div>
                    <button onClick={() => { onChangePrice(book) }}>Change price</button>
                    <Link to={`/book/edit/${book.id}`}><button>Edit book</button></Link>
                </div>
            </li>)
        }
    </ul>
}