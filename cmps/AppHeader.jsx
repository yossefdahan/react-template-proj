const { useNavigate } = ReactRouter
const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ setPage }) {
    const navigate = useNavigate()

    function onGoHome() {
        navigate('/')
    }


    return (<header className="app-header full">
        <h1>BOOKS SHOP</h1>
        <nav className="app-nav">

            <NavLink to="/">Home</NavLink> |
            <NavLink to="/about">About us</NavLink> |
            <NavLink to="/book">Books</NavLink>

        </nav>

    </header>)
}