import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Forfait from '../pages/Forfait'
import Profile from '../pages/Profile'
import Demande from '../pages/Demande'
import Promotion from '../pages/Promotion'
import Commentaire from '../pages/Commentaire'
import Notification from '../pages/Notification'
import Modification from '../pages/Modification'
import Certification from '../pages/Certification'
import ForgetPassword from '../pages/ForgetPassword'

export const routeConnected: Array<{ path: string, Element: () => JSX.Element }> = [
    { path: '/', Element: Home },
    { path: '/demandes', Element: Demande },
    { path: '/demandes/modifications', Element: Modification },
    { path: '/demandes/certifications', Element: Certification },
    { path: '/demandes/promotions', Element: Promotion },
    { path: '/demandes/forfaits', Element: Forfait },
    { path: '/commentaires', Element: Commentaire },
    { path: '/profile', Element: Profile },
    { path: '/notifications', Element: Notification },
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
    { path: '/notifications', Element: Notification },
]