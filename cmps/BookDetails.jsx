


export function BookDetails({ book, onGoBack }) {


    return <section>

        <button onClick={onGoBack}>Back to List</button>
        <h1>Title:{book.title}</h1>
        <p><span>{book.listPrice.amount}</span><span>{book.listPrice.currencyCode}</span></p>
    </section>


}