const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()


    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => {
                console.log('Had issues loading book', err)

                navigate('/book')
            })
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook', savedBook);
                navigate('/book')

                showSuccessMsg('Book saved successfully')
            })
            .catch(err => {
                console.log('Had issues saving book', err)
                showErrorMsg('could not save book')
            })

    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setBookToEdit(prevBookToEdit => {
            if (field === 'amount') {
                return { ...prevBookToEdit, listPrice: { ...prevBookToEdit.listPrice, amount: value } }
            }
            return { ...prevBookToEdit, [field]: value }
        })

    }

    const { title, listPrice } = bookToEdit

    return (
        <section className="car-edit">
            <form onSubmit={onSaveBook} >
                <label htmlFor="title">title:</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter title"

                    name="title"
                    onChange={handleChange}
                    value={title}
                />

                <label htmlFor="amount">Price:</label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Enter price"

                    name="amount"
                    onChange={handleChange}
                    value={listPrice.amount}
                />

                <button>Save</button>
            </form>
        </section>
    )
}