import React, { FC, useState } from 'react'

type COMPONENT = {
    name: string
}

const CategoryCard: FC<COMPONENT> = (props) => {
    const { name } = props

    const [selected, setSelected] = useState(false)

    return (
        <span className={selected ? 'category selected' : 'category'} onClick={() => setSelected(!selected)}>{name}</span>
    )
}

export default CategoryCard