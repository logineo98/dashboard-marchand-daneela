import React from 'react'
import { Link } from 'react-router-dom'
// my importations
import { page_demande } from '../utils/page_name'
import PageContainer from '../components/common/layout/page_container/PageContainer'
// my icons
import { MdEdit } from 'react-icons/md'
import { AiFillCreditCard } from 'react-icons/ai'
import { FaCertificate, FaGift } from 'react-icons/fa'

const Demande = () => {

    return (
        <PageContainer page_name={page_demande}>
            <div className='demande_container'>
                {/* modification d'information */}
                <Link to='/demandes/modifications' className='demande'>
                    <MdEdit className='demande_icon' size={40} />
                    <span className='demande_name'>Modification d'informations</span>
                </Link>
                {/* certification */}
                <Link to='/demandes/certifications' className='demande'>
                    <FaCertificate className='demande_icon' size={40} />
                    <span className='demande_name'>Certifications</span>
                </Link>
                {/* promotion */}
                <Link to='/demandes/promotions' className='demande'>
                    <FaGift className='demande_icon' size={40} />
                    <span className='demande_name'>Promotions</span>
                </Link>
                {/* forfait */}
                <Link to='/demandes/forfaits' className='demande'>
                    <AiFillCreditCard className='demande_icon' size={40} />
                    <span className='demande_name'>Forfaits</span>
                </Link>
            </div>
        </PageContainer>
    )
}

export default Demande