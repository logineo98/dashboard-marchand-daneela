import Home from '../pages/Home'
import ForgetPassword from '../pages/ForgetPassword'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Demande from '../pages/Demande'
import Commentaire from '../pages/Commentaire'
import Modification from '../pages/Modification'
import Certification from '../pages/Certification'
import Promotion from '../pages/Promotion'
import Forfait from '../pages/Forfait'
import Profile from '../pages/Profile'

export const routeConnected: Array<{ path: string, Element: () => JSX.Element }> = [
    { path: '/', Element: Home },
    { path: '/demandes', Element: Demande },
    { path: '/demandes/modifications', Element: Modification },
    { path: '/demandes/certifications', Element: Certification },
    { path: '/demandes/promotions', Element: Promotion },
    { path: '/demandes/forfaits', Element: Forfait },
    { path: '/commentaires', Element: Commentaire },
    { path: '/profile', Element: Profile },
]

export const routeNotConnected: Array<{ path: string, Element: () => JSX.Element }> = [
    { path: '/', Element: Login },
    { path: '/inscription', Element: Signup },
    { path: '/forget_password', Element: ForgetPassword },

    { path: '/demandes', Element: Demande },
    { path: '/demandes/modifications', Element: Modification },
    { path: '/demandes/certifications', Element: Certification },
    { path: '/demandes/promotions', Element: Promotion },
    { path: '/demandes/forfaits', Element: Forfait },
    { path: '/commentaires', Element: Commentaire },
    { path: '/profile', Element: Profile },
]