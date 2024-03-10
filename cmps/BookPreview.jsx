



export function BookPreview({ book }) {

    return <article>
        <h2>{book.title}</h2>
        <h3>{book.listPrice.amount}</h3>
        <h3>{book.listPrice.currencyCode}</h3>
    </article>
}