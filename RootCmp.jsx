
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { BookEdit } from "./pages/BookEdit.jsx";
import { AddReview } from "./cmps/AddReview.jsx";


import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'


export function App() {


    return (<Router>
        <section className="app main-layout">
            <AppHeader />


            <main className="full main-layout">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />

                    <Route path="/book" element={<BookIndex />} />
                    <Route path="/book/:bookId" element={<BookDetails />} />
                    <Route path="/book/edit" element={<BookEdit />} />
                    <Route path="/book/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/review/:bookId" element={<AddReview />} />
                </Routes>
            </main>

            <UserMsg />
        </section>
    </Router>)
}