import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import AuthContainer from '../components/common/layout/auth/AuthContainer'

const Login = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <AuthContainer title='Connexion' info='Veuillez saisir vos identifiants'>
            <form className='login_container' onSubmit={handleSubmit}>
                <div className='label_input_error_container'>
                    <label htmlFor='email' className='_label'>Adresse email *</label>
                    <input type='email' name='email' id='email' placeholder='Adresse email' className='_input' />
                </div>
                <div className='label_input_error_container'>
                    <label htmlFor='password' className='_label'>Mot de passe *</label>
                    <input type='password' name='password' id='password' placeholder='Mot de passe' className='_input' />
                </div>
                <div className='forget_password_container'>
                    <Link to='/forget_password' className='forget_password_link'>Mot de passe oublié ?</Link>
                </div>
                <div className='submit_btn_container'>
                    <button type='submit' className='submit_btn'>Se connecter</button>
                </div>
                <Link to='/inscription' className='signup_link'>Vous n'avez pas de compte ? Créer un compte</Link>
            </form>
        </AuthContainer>
    )
}

export default Login