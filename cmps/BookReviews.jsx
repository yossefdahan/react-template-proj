

export function BookReviews({ review }) {



    return <article>
        <h2>{review.fullName}</h2>
        <h3>{review.rating}</h3>
        <h3>{review.readAt}</h3>
    </article>

}