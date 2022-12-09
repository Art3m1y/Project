import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL, authApi } from '../http/axios'
import jwt_decode from "jwt-decode";
import axios from 'axios';
const initialState = {
    id: null,
    username: null,
    isAuth: false,
    loading: false,
}

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration',
    async (data, { dispatch }) => {
        try {
            const response = await authApi.registration(data)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            let userData = jwt_decode(response.data.token)
            console.log(userData)
            // dispatch(setUsername(response.data.username))
            // dispatch(setUsername(response.data.id))
            // dispatch(setIsAuth(true))
        } catch (error) {
            console.log(error)
        }
    })

export const fetchLogin = createAsyncThunk('auth/fetchLogin',
    async (data, { dispatch }) => {
        try {
            const response = await authApi.login(data)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            dispatch(setUsername(response.data.username))
            dispatch(setUsername(response.data.id))
            dispatch(setIsAuth(true))
        } catch (error) {
            console.log(error)
        }
    })
export const fetchLogout = createAsyncThunk('auth/fetchLogout',
    async (data, {dispatch}) => {
        try {
            const response = await authApi.logout(data)
            console.log(response)
            localStorage.removeItem('token')
            dispatch(setUsername(null))
            dispatch(setUsername(null))
            dispatch(setIsAuth(false))
        } catch (error) {
            console.log(error)
        }
    })
export const checkAuth = createAsyncThunk('auth/checkAuth',
    async (  _, { dispatch }) => {
        try {
            const response = await axios.get(`${API_URL}auth/refresh`, { withCredentials: true })
            console.log(response)
            localStorage.setItem('token', response.data.token)
            dispatch(setUsername(response.data.username))
            dispatch(setUsername(response.data.id))
            dispatch(setIsAuth(true))
        } catch (error) {
            console.log(error)
        }
    })

export const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state) {
            state.isAuth = true
        },
        setUserId(state, action) {
            state.id = action.payload
        },
        setUsername(state, action) {
            debugger
            state.username = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchLogin.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLogin.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(fetchRegistration.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchRegistration.fulfilled, state => {
            state.loading = false
        })
        builder.addCase(fetchLogout.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchLogout.fulfilled, state => {
            state.loading = false
        })
    }
})


export default authSLice.reducer
export const { setIsAuth, setUserId, setUsername } = authSLice.actions