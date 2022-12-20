import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { API_URL, authApi, LoginData, RegistrationData } from '../http/axios'
import jwt_decode from "jwt-decode";
import axios from 'axios';

type AuthState = {
    id: number | null,
    username: string | null,
    role: 'ROLE_USER'| 'ROLE_ADMIN' | null,
    isAuth: boolean,
    loading: boolean,
}

type AccessTokenDecoded ={
    email: string,
    iss: string,
    role: 'ROLE_USER'| 'ROLE_ADMIN',
}


const initialState: AuthState = {
    id: null,
    username: null,
    role: null,
    isAuth: false,
    loading: false,
}

export const fetchRegistration = createAsyncThunk<void, RegistrationData>('auth/fetchRegistration',
    async (data, { dispatch }) => {
            const response = await authApi.registration(data)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
            dispatch(setUsername(userData.iss))
            dispatch(setRole(userData.role))
            dispatch(setIsAuth(true))
    })

export const fetchLogin = createAsyncThunk<void, LoginData>('auth/fetchLogin',
    async (data, { dispatch }) => {
        try {
            const response = await authApi.login(data.email, data.password)
            localStorage.setItem('token', response.data.accessToken)
            let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
            dispatch(setUsername(userData.iss))
            dispatch(setRole(userData.role))
            dispatch(setIsAuth(true))
        } catch (error) {
            console.log(error)
        }
    })
export const fetchLogout = createAsyncThunk('auth/fetchLogout',
    async (data, { dispatch }) => {
        try {
            const response = await authApi.logout()
            console.log(response)
            localStorage.removeItem('token')
            dispatch(setUsername(null))
            dispatch(setUsername(null))
            dispatch(setRole(null))
            dispatch(setIsAuth(false))
        } catch (error) {
            console.log(error)
        }
    })
export const checkAuth = createAsyncThunk('auth/checkAuth',
    async (_, { dispatch }) => {
        try {
            const response = await axios.get(`${API_URL}auth/refreshtoken`, { withCredentials: true })
            localStorage.setItem('token', response.data.token)
            let userData = jwt_decode<AccessTokenDecoded>(response.data.accessToken)
            dispatch(setUsername(userData.iss))
            dispatch(setRole(userData.role))
            dispatch(setIsAuth(true))
        } catch (error) {
            console.log(error)
        }
    })

export const authSLice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setUserId(state, action: PayloadAction<number | null>) {
            state.id = action.payload
        },
        setUsername(state, action: PayloadAction<string | null>) {
            state.username = action.payload
        },
        setRole(state, action: PayloadAction<'ROLE_USER'| 'ROLE_ADMIN' | null>) {
            state.role = action.payload
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
export const { setIsAuth, setUserId, setUsername, setRole } = authSLice.actions