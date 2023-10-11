import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Axios from 'axios';
import {useState} from 'react'



const initialState = {
    user: {
        email: '',
        password: '',
    },
    Login: false
}

export const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const {
                email,
                password
            } = action.payload;
            state.user = {
                email,
                password
            }
        },
        loginSuccess: (state, action) => {
            state.Login = true;
        },
        logoutSuccess: (state) => {
            state.Login = false;
            localStorage.removeItem("token")
        },
        keepLoginSuccess: (state) => {
            state.Login = true;
        }
    }
})

export const Login = (data) => {
    const [usersData, setUsersData] = useState([])

    return (dispatch) => {
        const { email, password } = data;

        // Cek login berdasarkan data JSON yang sudah dimuat

        const res = Axios.get('http://localhost:3000/users')
        .then((response) => setUsersData(response.data))
        .catch((error) => console.error('Error loading data:', error));

    //     Axios.get('http://localhost:3000/users')
    //   .then((response) => setUsersData(response.data))
    //   .catch((error) => console.error('Error loading data:', error));
        const user = usersData.find((user) => user.email === email && user.password === password);
        
        if (user) {
                // Login(true)

                const token = res.data.password;
                localStorage.setItem("token", token);
                dispatch(loginSuccess());
                dispatch(setUser(res.data.isAccountExist));
                alert('Login Berhasil')
                console.log('Login berhasil');
              } else {
                alert('Email atau Password yang anda masukkan salah')
                console.error('Login gagal');
              }

       
    }
}

export const keepLogin = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("token");

        if (token) {
            const res = await axios.get("http://localhost:3000/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            dispatch(setUser(res.data));
            dispatch(keepLoginSuccess());
        }
    }
}

export const { loginSuccess, logoutSuccess, setUser, keepLoginSuccess } = AuthReducer.actions;

export default AuthReducer.reducer;