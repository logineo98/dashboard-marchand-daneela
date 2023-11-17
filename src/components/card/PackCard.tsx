import React, { FC } from 'react'
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
}

const PackCard: FC<COMPONENT_TYPE> = (props) => {
    const { pack } = props
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
                <h5 className='pack_amount_value'>{init_amount} FCFA</h5>
                <select name='mois' id='mois' className='pack_month_select_container'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(nb => <option key={nb} value={`${nb}`} className='pack_month_select'>{`${nb} Mois`}</option>)}
                </select>
            </div>
            <label htmlFor={`${check_name}`} className='pack_check_container'>
                <input type='checkbox' name={`${check_name}`} id={`${check_name}`} value='true' className='pack_check' />
                Cocher le pack
            </label>
        </div>
    )
}

export default PackCard