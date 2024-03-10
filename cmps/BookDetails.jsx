import { LongTxt } from "./LongTxt.jsx"



export function BookDetails({ book, onGoBack }) {
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

    return <section>

        <button onClick={onGoBack}>Back to List</button>
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
    </section>


}