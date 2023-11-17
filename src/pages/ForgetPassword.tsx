import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import AuthContainer from '../components/common/layout/auth/AuthContainer'

const ForgetPassword = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <AuthContainer title='Mot de passe oublié' info='Veuillez saisir votre adresse email'>
            <form className='forget_password_container_' onSubmit={handleSubmit}>
                <div className='label_input_error_container'>
                    <label htmlFor='email' className='_label'>Adresse email *</label>
                    <input type='email' name='email' id='email' placeholder='Adresse email' className='_input' />
                </div>
                <div className='submit_btn_container'>
                    <button type='submit' className='submit_btn'>Valider</button>
                </div>
                <Link to='/' className='signup_link'>J'ai déjà un compte</Link>
            </form>
        </AuthContainer>
    )
}

export default ForgetPassword