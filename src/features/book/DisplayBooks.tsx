import Book from './Book';
import './DisplayBooks.css'
import { useEffect } from 'react';
import { resetTitle } from '../title/titleSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getBooksRequest } from './bookSlice';

function DisplayBooks() {
    const dispatch = useAppDispatch();

    const books = useAppSelector(state => state.book);

    useEffect(() => {
        dispatch(getBooksRequest());
    }, [dispatch]);

   


    dispatch(resetTitle());

    return <div className = 'books'>
        { books.loading && <h1>Loading Books...</h1>}
        { !books.loading && books.error ? <h1>Error : {books.error}</h1> : null}
        { !books.loading && books.books.length ?
            books.books.map((item: any, index: number) => {
                return <Book key = {item.id} item = {item} />
            })
            : null
        }
       
    </div>
}

export default DisplayBooks;