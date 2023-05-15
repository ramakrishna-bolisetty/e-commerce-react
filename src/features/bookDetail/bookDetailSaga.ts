import { put, takeLatest } from 'redux-saga/effects';
import { getBookDetailError, getBookDetailRequest, getBookDetailSuccess } from './bookDetailSlice';
import axios, { AxiosResponse } from 'axios';
import { BookType } from '../book/bookSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { BOOK_DETAIL } from "../../../config";

function* bookDetailSaga(action: PayloadAction<string | undefined>) {
    try {
        const response: AxiosResponse<BookType[]> = yield axios.get(`${BOOK_DETAIL}+${action.payload}`);
        console.log("Response from Book Detail", response.data);
        yield put(getBookDetailSuccess(response.data));
    } catch (error) {
        yield put(getBookDetailError(error));
    }
}

function* watchGetBookDetails() {
    yield takeLatest(getBookDetailRequest, bookDetailSaga);
}

export default watchGetBookDetails;