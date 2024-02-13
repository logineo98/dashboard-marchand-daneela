import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// my importations
import PageContainer from '../components/common/layout/page_container/PageContainer'
import { page_home } from '../utils/page_name'
import { ROOT_REDUCER_TYPE } from '../redux/store'
import { _getAllCertifications } from '../redux/actions/certification.action'
import CertificationCard from '../components/card/home/CertificationCard'
import Loading from '../components/common/loading/Loading'
import { _getAllForfaits } from '../redux/actions/forfait.action'
import ForfaitCard from '../components/card/home/ForfaitCard'
import { _getAllPromotions } from '../redux/actions/promotion.action'
import { _getAllModifications } from '../redux/actions/modification.action'
import PromotionCard from '../components/card/home/PromotionCard'
import ModificationCard from '../components/card/home/ModificationCard'
// my icons
import { AiFillCreditCard } from 'react-icons/ai'
import { FaCertificate, FaGift } from 'react-icons/fa'
import { MdEdit, MdNotifications } from 'react-icons/md'


const Home = () => {
    const { marchand } = useSelector((state: ROOT_REDUCER_TYPE) => state.marchand)
    const { loadingModification, allModifications } = useSelector((state: ROOT_REDUCER_TYPE) => state.modification)
    const { loadingCertification, allCertifications } = useSelector((state: ROOT_REDUCER_TYPE) => state.certification)
    const { loadingPromotion, allPromotions } = useSelector((state: ROOT_REDUCER_TYPE) => state.promotion)
    const { loadingForfait, allForfaits } = useSelector((state: ROOT_REDUCER_TYPE) => state.forfait)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        marchand && dispatch(_getAllModifications(marchand.store.id))
        marchand && dispatch(_getAllCertifications(marchand.store.id))
        marchand && dispatch(_getAllPromotions(marchand.store.id))
        marchand && dispatch(_getAllForfaits(marchand.store.id))
    }, [dispatch, marchand])

    return (
        <PageContainer page_name={page_home}>
            <div className='home_container'>
                <div className='m_c_p_f_container'>
                    {/* modification d'information */}
                    <div className='m_c_p_f mod_cert'>
                        <div className='m_c_p_f_header_container'>
                            <MdEdit className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Modification d'informations</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        {loadingModification ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Loading />
                            </div> :
                            allModifications.length > 0 && allModifications.map(modification => <ModificationCard key={modification.id} modification={modification} />)
                        }
                    </div>
                    {/* certification */}
                    <div className='m_c_p_f mod_cert'>
                        <div className='m_c_p_f_header_container'>
                            <FaCertificate className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Certifications</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        {loadingCertification ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Loading />
                            </div> :
                            allCertifications.length > 0 && allCertifications.map(certification => <CertificationCard key={certification.id} certification={certification} />)
                        }
                    </div>
                    {/* promotions */}
                    <div className='m_c_p_f promo'>
                        <div className='m_c_p_f_header_container'>
                            <FaGift className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Promotions</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_name'>Montant(fcfa)</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        {loadingPromotion ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Loading />
                            </div> :
                            allPromotions.length > 0 && allPromotions.map(promotion => <PromotionCard key={promotion.id} promotion={promotion} />)
                        }
                    </div>
                    {/* forfait */}
                    <div className='m_c_p_f forfait'>
                        <div className='m_c_p_f_header_container'>
                            <AiFillCreditCard className='m_c_p_f_header_icon' size={20} />
                            <span className='m_c_p_f_header_name'>Forfaits</span>
                        </div>
                        <div className='m_c_p_f_menu_container'>
                            <span className='m_c_p_f_menu_name'>Date</span>
                            <span className='m_c_p_f_menu_name'>Statut</span>
                            <span className='m_c_p_f_menu_name'>Pack</span>
                            <span className='m_c_p_f_menu_name'>Montant</span>
                            <span className='m_c_p_f_menu_action'></span>
                        </div>
                        {loadingForfait ?
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Loading />
                            </div> :
                            allForfaits.length > 0 && allForfaits.map(forfait => <ForfaitCard key={forfait.id} forfait={forfait} />)
                        }
                    </div>
                </div>

                {/* notification container */}
                <div className='notification_container'>
                    <div className='notification_header_container'>
                        <MdNotifications className='notification_header_icon' size={20} />
                        <span className='notification_header_name'>Notification</span>
                    </div>
                    <div className='notification_content_container'>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Modification d'information</span>
                            <span className='notification_content_value'>4</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Certifications</span>
                            <span className='notification_content_value'>10</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Promotions</span>
                            <span className='notification_content_value'>8</span>
                        </div>
                        <div className='notification_content'>
                            <span className='notification_content_name'>Forfaits</span>
                            <span className='notification_content_value'>4</span>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Home