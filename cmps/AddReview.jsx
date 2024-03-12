const { useEffect, useState } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"
import { BookReviews } from "./BookReviews.jsx"
import { TypeByStars } from "./TypeByStars.jsx"
import { TypeByTextBox } from "./TypeByTextBox.jsx"
import { TypeSelect } from "./TypeSelect.jsx"

export function AddReview() {
    const [reviews, setReviews] = useState(null)
    const [review, setReview] = useState(bookService.getEmptyReview())
    const { bookId } = useParams()
    const [cmpType, setCmpType] = useState('')

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
            .then(() => {
                setReviews([review, ...reviews])
              
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        console.log(value);
        switch (target.type) {
            case 'number':
                value = +value
                break

            default:
                break
        }

        console.log(value);
        setReview(prevBookToEdit => ({ ...prevBookToEdit, [field]: value}))
}

const { fullName, rating, readAt } = review
console.log(review)
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

        <div>

            <label htmlFor="rating-select">Rate by select</label>
            <input type="radio"
                id="rating-select"
                name="rating"
                value='select'
                onClick={(ev) => setCmpType(ev.target.value)}
            />


            <label htmlFor="rating-box">Rate by selectBox</label>
            <input type="radio"
                id="rating-box"
                name="rating"
                value='textbox'
                onClick={(ev) => setCmpType(ev.target.value)}
            />
        </div>
        <DynamicCmp cmpType={cmpType} handleChange={handleChange} rating={rating} />


        {/* <label htmlFor="rating">Rating:</label>
            <input type="number"
                id="rating"
                placeholder="Enter rating.."
                min="1"
                max="5"
                name="rating"
                onChange={handleChange}
                value={rating}
            /> */}

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


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'select':
            return <TypeSelect {...props} />
        case 'star':
            return <TypeByStars {...props} />
        case 'textbox':
            return <TypeByTextBox {...props} />
    }
}