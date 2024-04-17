import React, { FC } from 'react'
// my icons
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type COMPONENT_TYPE = {
    value: string
    size?: number
}

const Rating: FC<COMPONENT_TYPE> = (props) => {
    const { value, size } = props

    const starsArray = value ? Array.from({ length: 5 }, (_, i) => ({ name: i < (parseInt(value[0], 10) || 0) ? 'full' : 'outline', color: i < (parseInt(value[0], 10) || 0) ? '#E91E63' : '#000', i: i + 1 })) : []

    return (
        <div className='rating_container'>
            {starsArray.map(star => {
                if (star.name === 'full') return <AiFillStar key={star.i} size={size || 14} color={star.color} />
                else return <AiOutlineStar key={star.i} size={size || 14} color={star.color} />
            })}
        </div>
    )
}

export default Rating