export const isTokenExpired = (actual: number, final: number) => final < actual ? true : false

export const addMonth = (date: Date, month: number) => {
    const new_date = new Date(date)
    new_date.setMonth(new_date.getMonth() + month)

    return new_date
}

export const formatDate = (date: number) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const hour = new Date(date).getHours() < 10 ? `0${new Date(date).getHours()}` : new Date(date).getHours()
    const minute = new Date(date).getMinutes() < 10 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()

    return `${day}/${month}/${year} à ${hour}:${minute}`
}

export const formatDateJMA = (date: number) => {
    const day = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : new Date(date).getDate()
    const month = new Date(date).getMonth() + 1 < 10 ? `0${new Date(date).getMonth() + 1}` : new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()

    return `${day}/${month}/${year}`
}

export const amountCalculation = (amount: number, month: number) => {

    if (month < 3) return amount * month
    else if (month < 6) return ((amount * month) - ((amount * month) * 0.25))
    else if (month < 9) return ((amount * month) - ((amount * month) * 0.30))
    else if (month < 12) return ((amount * month) - ((amount * month) * 0.35))
    else return ((amount * month) - ((amount * month) * 0.40))
}

export const formatNumberWithSpaces = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

type TYPE_IMG_TYPE = 'logo' | 'couverture' | 'prod_phare_1' | 'prod_phare_2' | 'prod_phare_3'
// convertir un string base64 en type File
export const base64ToFile = (base64String: string, fileName: TYPE_IMG_TYPE, mimeType = 'image/png') => {
    // Convertir la chaîne Base64 en tableau d'octets
    const byteCharacters = atob(base64String.toString().replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, ''))
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    // Créer un objet de type File
    const file = new File([byteArray], fileName, { type: mimeType })

    return file
}