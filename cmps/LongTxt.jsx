const { useState } = React


export function LongTxt({ book, length }) {
    const [isDescOpen, setIsDescOpen] = useState(false)

    function getBookDesc() {
        if (isDescOpen) {
            return book.description
        }
        if (book.description.length > length) {
            return book.description.substring(0, 100) + '...'
        } return book.description
    }


    function onReadMore() {
        setIsDescOpen(prevIsOpen => !prevIsOpen)
        getBookDesc()
    }




    return <React.Fragment>
        <p>{getBookDesc()}</p>
        {(book.description.length > length) && <button onClick={() => onReadMore()}>Read more</button>}
    </React.Fragment>

}