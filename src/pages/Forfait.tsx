import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_forfait } from '../utils/page_name'
import { packs } from '../utils/packs'
import PackCard from '../components/card/PackCard'

const Forfait = () => {

    const handleValidate = () => { }

    return (
        <PageContainer page_name={page_forfait}>
            <div className='forfait_container'>
                {/* description */}
                <div className='forfait'>
                    <h1 className='forfait_title'>Description</h1>
                    <p className='forfait_text'>Les forfaits sont des packs de services et de fonctionnalités vendus de manière groupée.</p>
                </div>
                {/* packs */}
                <div className='forfait'>
                    <h1 className='forfait_title'>Packs</h1>
                    <p className='forfait_text'>Il existe 3 packs sur la plateforme :</p>
                </div>
                {/* les trois packs */}
                <div className='packs_container'>
                    {packs.map(pack => <PackCard key={pack._id} pack={pack} />)}
                </div>

                {/* valider ou annuler */}
                <div className='validate_cancel_container'>
                    <Link to='/demandes' className='cancel'>Annuler</Link>
                    <button className='validate' onClick={handleValidate}>Valider</button>
                </div>
            </div>
        </PageContainer>
    )
}

export default Forfait