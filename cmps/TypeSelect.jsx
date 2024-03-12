


export function TypeSelect({ handleChange ,rating}) {

    function onSetValue(ev) {
        handleChange(ev)
    }

    return <section>
        <select type="select" onChange={onSetValue} value={rating} name="rating">

            <option value="">Select rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>

    </section >
}