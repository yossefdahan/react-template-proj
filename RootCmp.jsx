const { useState } = React


import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'




export function App() {

    const [page, setPage] = useState('home')



    return (<section className="app main-layout">
        <AppHeader setPage={setPage} />


        <main className="full main-layout">
            {page === 'home' && <HomePage />}
            {page === 'about' && <AboutUs />}
            {page === 'books' && <BookIndex />}
        </main>
    </section>)
}