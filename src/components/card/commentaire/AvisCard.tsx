import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import Rating from '../../common/rating/Rating'
import Loading from '../../common/loading/Loading'
import { formatDate } from '../../../utils/functions'
import { ROOT_REDUCER_TYPE } from '../../../redux/store'
import { _addAvis, _deleteAvis, _deleteAvisResponse } from '../../../redux/actions/avis.action'
// my icons
import { MdOutlineDelete } from 'react-icons/md'
import { LuSendHorizonal } from 'react-icons/lu'
import { IoMdCloseCircleOutline } from 'react-icons/io'

type COMPONENT_TYPE = {
    avis_: {
        id: string
        auteur: string
        avatar: string
        fbUserId: string
        note: number
        content: {
            id: string
            message: string
            reponse: {
                id: string
                message: string
                createdAt: Date
                updatedAt: Date
            } | null
            createdAt: Date
            updatedAt: Date
        } | null
    }
    marchand_id: string
}

const AvisCard: FC<COMPONENT_TYPE> = (props) => {
    const { avis_, marchand_id } = props

    const { loadingAddAvis, loadingDeleteAvis, loadingDeleteAvisResponse, } = useSelector((state: ROOT_REDUCER_TYPE) => state.avis)
    const dispatch = useDispatch<any>()

    const [giveResponse, setGiveResponse] = useState(false)
    const [responseValue, setResponseValue] = useState('')
    const [err, setErr] = useState('')
    const [avisIdSelected, setAvisIdSelected] = useState<string>()

    const handleGiveResponse = () => {
        if (giveResponse) {
            setGiveResponse(false)
            setResponseValue('')
            setErr('')
        } else {
            setGiveResponse(true)
        }
    }

    const handleCloseGiveResponse = () => { setGiveResponse(false); setResponseValue(''); setErr('') }

    const handleSendResponse = () => {
        if (!responseValue || responseValue.trim() === '') {
            setErr('Veuillez renseigner ce champ.')
        } else {
            setErr('')

            dispatch(
                _addAvis(
                    avis_.id,
                    { storeId: marchand_id, response: responseValue },
                    setGiveResponse,
                    setResponseValue,
                    setErr
                )
            )
        }
    }

    const handleDeleteAvis = (avis: typeof avis_) => {
        setAvisIdSelected(avis.id)
        dispatch(_deleteAvis(avis_.id))
    }

    const handleDeleteAvisResponse = (avis: typeof avis_) => {
        setAvisIdSelected(avis.id)
        dispatch(_deleteAvisResponse(avis_.content?.reponse?.id as string))
    }

    return (
        <div className='avis_commentaire_response_container'>
            <div className='avis_commentaire'>
                <div className='avis_commentaire_author_date_container'>
                    <p className='avis_commentaire_author'>{avis_.auteur} {avis_.id === avisIdSelected && loadingDeleteAvis && <Loading width='14' />}</p>
                    <div className='avis_commentaire_date_rate'>
                        <Rating value={avis_.note.toString()} />
                        <span className='avis_commentaire_date'>{formatDate(new Date(avis_.content?.createdAt as Date).getTime())}</span>
                    </div>
                </div>

                <div className='avis_commentaire_option_container'>
                    <MdOutlineDelete className='avis_commentaire_option' onClick={() => handleDeleteAvis(avis_)} />
                </div>
            </div>

            <p className='commentaire'>{avis_.content?.message}</p>

            <div className='avis_response'>

                {!avis_.content?.reponse && <span className='avis_response_btn' onClick={handleGiveResponse}>Répondre</span>}

                <div className='avis_response_content_container'>
                    {avis_.content?.reponse &&
                        <div className='avis_response_user_content_container'>
                            <div className='avis_response_user_container'>
                                <p className='avis_response_user_author'>Moi {avis_.id === avisIdSelected && loadingDeleteAvisResponse && <Loading width='14' />}</p>
                                <span className='avis_response_date'>{formatDate(new Date(avis_.content?.reponse?.createdAt as Date).getTime())}</span>
                            </div>
                            <div className='avis_response_content_icon_container'>
                                <p className='avis_response_content'>{avis_.content?.reponse?.message}</p>
                                <MdOutlineDelete className='avis_response_content_icon' onClick={() => handleDeleteAvisResponse(avis_)} />
                            </div>
                        </div>
                    }

                    {giveResponse &&
                        <div className='avis_response_input_icon_error_container'>
                            <div className='loading_nb_caractere_container'>
                                <div>{loadingAddAvis && <Loading width='20' />}</div>
                                <span className='nb_caractere_saisie'>{`${responseValue.length}/255`}</span>
                            </div>
                            <textarea placeholder='Saisissez votre réponse' disabled={loadingAddAvis} onChange={e => setResponseValue(e.target.value)} maxLength={255} className='avis_response_input'></textarea>
                            <div className='avis_response_error_icon_container'>
                                <span className='avis_response_error'>{err}</span>
                                <div className='avis_response_icon_container'>
                                    {!loadingAddAvis &&
                                        <>
                                            <IoMdCloseCircleOutline className='avis_response_icon' onClick={handleCloseGiveResponse} />
                                            <LuSendHorizonal className='avis_response_icon' onClick={handleSendResponse} />
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AvisCard