import { BookPreview } from "./BookPreview.jsx"



export function BooksList({ books, onSelectedBook }) {


    

    if (!books.length) return <div>No Books Found..</div>
    return <ul>
        {
            books.map(book => <li key={book.id}>
                <BookPreview book={book} />
                <div>
                    <button onClick={() => { onSelectedBook(book) }}>See more..</button>
                </div>
            </li>)
        }
    </ul>

}