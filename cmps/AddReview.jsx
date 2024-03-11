const { useEffect, useState } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { BookReviews } from "./BookReviews.jsx"

export function AddReview() {
    const [reviews, setReviews] = useState(null)

    const [review, setReview] = useState(bookService.getEmptyReview())

    const { bookId } = useParams()


    useEffect(() => {


        loadReview()

    }, [])

    function loadReview() {
        bookService.get(bookId)
            .then(book => {

                setReviews(book.review)
               

            })
            .catch(err => {
                console.log('had issues with review upload', err)
            })
    }


    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, review)
            .then(() => loadReview())
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
                value = +value
                break

            default:
                break
        }

        setReview(prevBookToEdit => {

            return { ...prevBookToEdit, [field]: value }

        })
    }

    console.log(reviews)

    const { fullName, rating, readAt } = review
    return <section>

        <form onSubmit={onSaveReview}>

            <label htmlFor="fullName">Full name:</label>
            <input type="text"
                id="fullName"
                placeholder="Enter full name.."
                onChange={handleChange}
                name='fullName'
                value={fullName}
            />

            <label htmlFor="rating">Rating:</label>
            <input type="number"
                id="rating"
                placeholder="Enter rating.."
                min="1"
                max="5"
                name="rating"
                onChange={handleChange}
                value={rating}
            />

            <label htmlFor="readAt">Read at:</label>
            <input type="date"
                id="readAt"
                name="readAt"
                onChange={handleChange}
                value={readAt}
            />

            <button>Save review</button>
        </form>


        <div>
            <ul>
                {
                    reviews && reviews.map(review => <li key={review.fullName}>
                        <BookReviews review={review} />
                    </li>)
                }
            </ul>
        </div>
    </section>


}