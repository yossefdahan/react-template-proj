import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOKS_KEY = 'bookDb'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getDefaultFilter,
    // setFilterBy
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.listPrice.amount) {
                books = books.filter(book => book.listPrice.amount >= filterBy.listPrice.amount)
            }
            return books
        })
}

function getDefaultFilter() {
    return { title: '', listPrice: { amount: 50 } }
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOKS_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOKS_KEY, book)
    } else {
        return storageService.post(BOOKS_KEY, book)
    }
}

function getEmptyBook(title = '') {
    return {
        id: '',
        title,
        listPrice: {
            amount: utilService.getRandomIntInclusive(50, 200),
            currencyCode: "EUR",
            isOnSale: false
        }
    }
}

// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     // if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

function getNextBookId(bookId) {
    return storageService.query(BOOKS_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('metus hendrerit'))
        books.push(_createBook('harry potter 1'))
        books.push(_createBook('harry potter 2'))

        utilService.saveToStorage(BOOKS_KEY, books)
    }
}

function _createBook(title) {
    const book = getEmptyBook(title)
    book.id = utilService.makeId()
    return book
}

