



export function BookPreview({ book }) {

    function setOnSale() {
        if (book.listPrice.isOnSale) {
            return ' -  On sale ✅'
        }
    }

    function setColorPrice() {
        if (book.listPrice.amount > 150) {
            return 'high-price'
        } else if (book.listPrice.amount < 60) {
            return 'low-price'
        }
    }

    return <div className="book-view-main">

        <h2 className="book-header">{book.title}</h2>
        <img src={book.thumbnail} alt="photo" />
        <h3 className={setColorPrice()}>{book.listPrice.amount} {book.listPrice.currencyCode} {setOnSale()}</h3>
    </div>
}