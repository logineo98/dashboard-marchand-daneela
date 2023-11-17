import React, { FC } from 'react'
// my icons
import { AiOutlineStar } from 'react-icons/ai'

type COMPONENT_TYPE = {
    size?: number
}

const Rating: FC<COMPONENT_TYPE> = (props) => {
    const { size } = props

    return (
        <div className='rating_container'>
            {[1, 2, 3, 4, 5].map(nb => (<AiOutlineStar key={nb} size={size ? size : 14} className='rating' />))}
        </div>
    )
}

export default Rating