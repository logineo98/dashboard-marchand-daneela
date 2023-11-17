import React, { FC } from 'react'
import CategoryCard from './CategoryCard'

type COMPONENT = {
    category: {
        id: string
        name: string
        path: string
        children: {
            id: string
            name: string
        }[]
    }
}

const SubCategoryCard: FC<COMPONENT> = (props) => {
    const { category } = props

    return (
        <div className='category_container'>
            <h3 className='category_title sub'>{category.name}</h3>
            <div className='category_content_container'>
                {category.children.map(sub_category => <CategoryCard key={sub_category.id} name={sub_category.name} />)}
            </div>
        </div>
    )
}

export default SubCategoryCard