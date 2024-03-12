

export function TypeByTextBox({ handleChange ,rating}) {

    function onSetValue(ev) {
        handleChange(ev)
    }

    return <section>
      <label htmlFor="rating">Rating:</label>
            <input type="text"
                id="rating"
                placeholder="Enter rating.."
                name="rating"
                onChange={onSetValue}
                value={rating}
            /> 

    </section>
}