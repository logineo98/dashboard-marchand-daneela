import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { ROOT_REDUCER_TYPE } from '../redux/store'
import { page_commentaire } from '../utils/page_name'
import Rating from '../components/common/rating/Rating'
import { _getAvis } from '../redux/actions/avis.action'
import AvisCard from '../components/card/commentaire/AvisCard'
import PageContainer from '../components/common/layout/page_container/PageContainer'
// my icons
import { FaUserCircle } from 'react-icons/fa'
import Loading from '../components/common/loading/Loading'

const Commentaire = () => {

    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const { loadingAvis, avis } = useSelector((state: ROOT_REDUCER_TYPE) => state.avis)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        marchand && dispatch(_getAvis(marchand.store.id))
    }, [dispatch, marchand])

    return (
        <PageContainer page_name={page_commentaire}>
            <div className='commentaire_container'>
                {loadingAvis ?
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Loading />
                    </div> :
                    <>
                        {/* commentaire header */}
                        <div className='commentaire_header_container'>
                            <FaUserCircle size={40} className='commentaire_header_icon' />
                            <h1 className='commentaire_header_title'>Donner une note</h1>
                            <p className='commentaire_header_text'>Partager votre expérience afin d'aider les autres utilisateurs</p>
                            {avis && <Rating value={avis.rate?.value?.toString()} size={45} />}
                        </div>

                        {/* résumé note client et commentaire et avis */}
                        {/* résumé des notes clients */}
                        <div className='resume_commentaire_container'>
                            <p className='resume_commentaire_title'>Résumé des notes clients</p>
                            <div className='resume_commentaire_content_container'>
                                {avis &&
                                    <div className='note_horiz_vert_container'>
                                        <div className='note_horizontale_container'>
                                            {[5, 4, 3, 2, 1].map(value => {
                                                const rateValue = avis.rate?.rates?.find(rate => rate.rate === value.toString())
                                                let rateValuePercent

                                                if (rateValue) rateValuePercent = avis.rate?.votes > 0 ? ((rateValue.value / avis.rate?.votes) * 100).toFixed(2) : 0

                                                return (
                                                    <div key={value} className='note_horizontale'>
                                                        <span className='note_horizontale_value'>{value}</span>
                                                        <div className='note_horizontale_progress'>
                                                            <div style={{ height: '100%', width: `${rateValuePercent}%`, backgroundColor: '#E91E63', borderRadius: 3, }}></div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className='note_verticale_container'>
                                            <h2 className='note_verticale_value'>{avis.rate?.value}</h2>
                                            <Rating value={avis.rate?.value.toString()} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* commentaires et avis */}
                        <div className='resume_commentaire_container'>
                            <p className='resume_commentaire_title'>Commentaires et avis</p>
                            <div className='resume_commentaire_content_container'>
                                <div className='commentaire_content_container'>
                                    {avis && avis.avis?.map(avis => avis.content ? <AvisCard key={avis.id} avis_={avis} marchand_id={marchand?.store.id as string} /> : null)}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </PageContainer>
    )
}

export default Commentaire