import axios from 'axios'
import { toast } from 'react-toastify'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// my importations
import Loading from '../components/common/loading/Loading'
import { GET_MARCHAND, auth, marchand } from '../redux/constants'
import AuthContainer from '../components/common/layout/auth/AuthContainer'

const Login = () => {
    const data = { email: '', password: '' }

    const [loginData, setLoginData] = useState(data)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch<any>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { email, password } = loginData

        if (email?.trim() && password) {
            setLoading(true)

            axios.post(auth, loginData)
                .then(res => {
                    setLoading(false)

                    const deconnectionHour = new Date(new Date().getTime() + res.data.expireIn)

                    localStorage.setItem('accessToken', res.data.accessToken)
                    localStorage.setItem('refreshToken', res.data.refreshToken)
                    localStorage.setItem('email', res.data.email)
                    localStorage.setItem('expireIn', deconnectionHour.getTime().toString())

                    axios.get(`${marchand}/me`, { headers: { Authorization: `Bearer ${res.data.accessToken}` } })
                        .then(res => {
                            localStorage.setItem('marchand', JSON.stringify(res.data))

                            dispatch({ type: GET_MARCHAND, payload: res.data })

                            window.location.href = '/'
                        })
                        .catch(error => {
                            // toast.error(error?.response?.data?.message)
                            toast.error('Erreur survenue lors de la récupération du marchand. Veuillez réessayer.')
                            setLoading(false)
                        })
                })
                .catch(error => {
                    toast.error(error?.response?.data?.message)
                    setLoading(false)
                })

        } else toast.warning('Veuillez renseigner les deux champs !')
    }

    return (
        <AuthContainer title='Connexion' info='Veuillez saisir vos identifiants'>
            <form className='login_container' onSubmit={handleSubmit}>
                <div className='label_input_error_container'>
                    <label htmlFor='email' className='_label'>Adresse email *</label>
                    <input type='email' name='email' id='email' disabled={loading} placeholder='Adresse email' className='_input' onChange={handleChange} />
                </div>
                <div className='label_input_error_container'>
                    <label htmlFor='password' className='_label'>Mot de passe *</label>
                    <input type='password' name='password' id='password' disabled={loading} placeholder='Mot de passe' className='_input' onChange={handleChange} />
                </div>
                <div className='forget_password_container'>
                    <Link to='/forget_password' className='forget_password_link'>Mot de passe oublié ?</Link>
                </div>
                <div className='submit_btn_container'>
                    <button type='submit' disabled={loading ? true : false} className='submit_btn'>{loading ? <Loading color='#FFFFFF' width='10' /> : 'Se connecter'}</button>
                </div>
                <Link to='/inscription' className='signup_link'>Vous n'avez pas de compte ? Créer un compte</Link>
            </form>
        </AuthContainer>
    )
}

export default Login