import React from 'react'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_commentaire } from '../utils/page_name'
// my icons
import { FaUserCircle } from 'react-icons/fa'
import Rating from '../components/common/rating/Rating'

const Commentaire = () => {

    return (
        <PageContainer page_name={page_commentaire}>
            <div className='commentaire_container'>
                {/* commentaire header */}
                <div className='commentaire_header_container'>
                    <FaUserCircle size={40} className='commentaire_header_icon' />
                    <h1 className='commentaire_header_title'>Donner une note</h1>
                    <p className='commentaire_header_text'>Partager votre expérience afin d'aider les autres utilisateurs</p>
                    <Rating size={45} />
                </div>

                {/* résumé note client et commentaire et avis */}
                {/* résumé des notes clients */}
                <div className='resume_commentaire_container'>
                    <p className='resume_commentaire_title'>Résumé des notes clients</p>
                    <div className='resume_commentaire_content_container'>
                        <div className='note_horiz_vert_container'>
                            <div className='note_horizontale_container'>
                                {[5, 4, 3, 2, 1].map(nb => (
                                    <div key={nb} className='note_horizontale'>
                                        <span className='note_horizontale_value'>{nb}</span>
                                        <div className='note_horizontale_progress'></div>
                                    </div>
                                ))}
                            </div>
                            <div className='note_verticale_container'>
                                <h2 className='note_verticale_value'>0.0</h2>
                                <Rating />
                            </div>
                        </div>
                    </div>
                </div>
                {/* commentaires et avis */}
                <div className='resume_commentaire_container'>
                    <p className='resume_commentaire_title'>Commentaires et avis</p>
                    <div className='resume_commentaire_content_container'>

                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Commentaire