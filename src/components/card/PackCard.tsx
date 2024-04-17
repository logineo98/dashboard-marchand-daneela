import React, { FC } from 'react'
// my importations
import { PACK_TYPE } from '../../pages/Forfait'
import { amountCalculation, formatNumberWithSpaces } from '../../utils/functions'
// my icons
import { ImCheckmark, ImCross } from 'react-icons/im'

type COMPONENT_TYPE = {
    pack: {
        _id: string
        pack_name: string
        options: {
            authorize: boolean
            name: string
        }[]
        lists: string[]
        init_amount: number
        check_name: string
    }

    month: { gold: number, diamond: number, platinium: number }
    setMonth: React.Dispatch<React.SetStateAction<{ gold: number, diamond: number, platinium: number }>>
    packName: PACK_TYPE
    setPackName: React.Dispatch<React.SetStateAction<PACK_TYPE>>
}

const PackCard: FC<COMPONENT_TYPE> = (props) => {
    const { month, pack, packName, setMonth, setPackName } = props
    const { _id, check_name, init_amount, lists, options, pack_name } = pack

    return (
        <div className='pack'>
            <p className={`pack_color ${_id}`}></p>
            <h2 className='pack_name'>{pack_name}</h2>
            <div className='pack_options_container'>
                {options.map(option => {
                    const { authorize, name } = option

                    return (
                        <div key={name} className='pack_option'>
                            {authorize ? <ImCheckmark size={12} color='#4CAF50' className='pack_option_icon' /> : <ImCross size={12} color='#FF0000' className='pack_option_icon' />}
                            <span className='pack_option_name'>{name}</span>
                        </div>
                    )
                })}
            </div>
            <ul className='pack_lists_container'>
                {lists.map(list_item => <li key={list_item} className='pack_list_item'>{list_item}</li>)}
            </ul>
            <div className='pack_amount_month_container'>
                <h6 className='pack_amount_name'>Prix</h6>
                <h5 className='pack_amount_value'>{formatNumberWithSpaces(amountCalculation(init_amount, check_name === 'Gold' ? month.gold : check_name === 'Diamond' ? month.diamond : month.platinium))} FCFA</h5>
                <select name='mois' id='mois' disabled={packName === check_name ? false : true} value={check_name === 'Gold' ? month.gold : check_name === 'Diamond' ? month.diamond : month.platinium} onChange={e => setMonth({ ...month, gold: packName === 'Gold' ? parseInt(e.target.value, 10) : 1, diamond: packName === 'Diamond' ? parseInt(e.target.value, 10) : 1, platinium: packName === 'Platinium' ? parseInt(e.target.value, 10) : 1 })} className='pack_month_select_container'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(nb => <option key={nb} value={nb} className='pack_month_select'>{`${nb} Mois`}</option>)}
                </select>
            </div>
            <label htmlFor={check_name} className='pack_check_container'>
                <input type='checkbox' name={check_name} id={check_name} value={check_name} checked={packName === check_name ? true : false} onChange={e => setPackName(e.target.value as PACK_TYPE)} className='pack_check' />
                Cocher le pack
            </label>
        </div>
    )
}

export default PackCard