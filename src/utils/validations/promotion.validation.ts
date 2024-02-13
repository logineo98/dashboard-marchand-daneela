/************************************************************
 * demande de promotion
 */
export type PROMOTION_VALIDATION_TYPE = {
    debut?: string
    slider?: string
}

type PROMOTION_TYPE = {
    debut: string
    cover: string
    couvertureDimensionError: boolean
    couvertureSizeError: boolean
    couvertureTypeError: boolean
}

export const validation_promotion = (props: PROMOTION_TYPE) => {
    const { couvertureDimensionError, couvertureSizeError, couvertureTypeError, debut, cover } = props

    const initialError: PROMOTION_VALIDATION_TYPE = { debut: '', slider: '' }

    let error = initialError

    // debut
    if (!debut || debut.trim() === '') error = { ...error, debut: '*Ce champ est obligatoire.' }
    // couverture
    if (!cover || cover.trim() === '') error = { ...error, slider: '*Ce champ est obligatoire.' }
    else if (couvertureDimensionError) error = { ...error, slider: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (couvertureSizeError) error = { ...error, slider: `*Veuillez corriger l'erreur ci-dessus.` }
    else if (couvertureTypeError) error = { ...error, slider: `*Veuillez corriger l'erreur ci-dessus.` }

    return { error, initialError }
}