import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import { packs } from '../utils/packs'
import { page_forfait } from '../utils/page_name'
import { ROOT_REDUCER_TYPE } from '../redux/store'
import PackCard from '../components/card/PackCard'
import { amountCalculation } from '../utils/functions'
import { _addForfait } from '../redux/actions/forfait.action'
import PageContainer from '../components/common/layout/page_container/PageContainer'

export type PACK_TYPE = 'Gold' | 'Diamond' | 'Platinium'

const Forfait = () => {
    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const dispatch = useDispatch<any>()

    const [packName, setPackName] = useState<PACK_TYPE>('Gold')
    const [month, setMonth] = useState<{ gold: number, diamond: number, platinium: number }>({ gold: 1, diamond: 1, platinium: 1 })

    const handleValidate = () => {
        marchand && dispatch(
            _addForfait(
                {
                    storeId: marchand.store.id,
                    duree: packName === 'Gold' ? month.gold : packName === 'Diamond' ? month.diamond : month.platinium,
                    montant: amountCalculation(packName === 'Gold' ? 5000 : packName === 'Diamond' ? 10000 : 15000, packName === 'Gold' ? month.gold : packName === 'Diamond' ? month.diamond : month.platinium),
                    type: packName
                },
                setPackName,
                setMonth
            )
        )
    }

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
                    {packs.map(pack => <PackCard key={pack._id} month={month} pack={pack} packName={packName} setMonth={setMonth} setPackName={setPackName} />)}
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