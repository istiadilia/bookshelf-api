const { nanoid } = require('nanoid');
const books = require('./books');
const { request } = require('express');

// Add book handler
const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    
    const bookId = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        bookId, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
    };

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    const isSuccess = books.push(newBook) > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                'bookId' : 'bookId',
            },
        });
        response.code(201);
        return response;
    }
};

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
    // status code 200
});

const getBookByIdHandler = (request, h) => {
    // get id
    const { bookId } = request.params;

    // get object book by id
    const book = books.filter((b) => b.bookId === bookId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book: {
                    id: book.bookId,
                    name: book.name,
                    year: book.year,
                    author: book.author,
                    summary: book.summary,
                    publisher: book.publisher,
                    pageCount: book.pageCount,
                    readPage: book.readPage,
                    finished: book.finished,
                    reading: book.reading,
                    insertedAt: book.insertedAt,
                    updatedAt: book.updatedAt,
                }
            },
        };
        // status code 200
    }
};

module.exports = { 
    addBookHandler,
    getAllBooksHandler,
};