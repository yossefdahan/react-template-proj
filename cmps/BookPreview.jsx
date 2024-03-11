



export function BookPreview({ book }) {

    function setOnSale() {
        if (book.listPrice.isOnSale) {
            return 'On sale ✅'
        }
    }

    function setColorPrice() {
        if (book.listPrice.amount > 150) {
            return 'high-price'
        } else if (book.listPrice.amount < 60) {
            return 'low-price'
        }
    }

    return <article>
        <img src={book.thumbnail} alt="photo" />
        <h2>{book.title}</h2>
        <h3 className={setColorPrice()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        <h4>{setOnSale()}</h4>
    </article>
}