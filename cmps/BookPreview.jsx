



export function BookPreview({ book }) {

    function setOnSale() {
        if (book.listPrice.isOnSale) {
            return 'On sell ✅'
        } else {
            return 'Not for Sell ❌'
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
        <h2>{book.title}</h2>
        <h3 className={setColorPrice()}>{book.listPrice.amount} {book.listPrice.currencyCode}</h3>
        <h4>{setOnSale()}</h4>
    </article>
}