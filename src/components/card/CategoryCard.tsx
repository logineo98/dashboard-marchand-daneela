import React, { FC } from 'react'
// json
import categories_json from '../../utils/json/categories.json'

type COMPONENT = {
    name: string
    editable?: boolean

    categories?: string[]
    setCategories?: React.Dispatch<React.SetStateAction<string[]>>
    sousCategories?: string[]
    setSousCategories?: React.Dispatch<React.SetStateAction<string[]>>
}

const CategoryCard: FC<COMPONENT> = (props) => {
    const { name, categories, editable, setCategories, sousCategories, setSousCategories } = props

    const handleSelected = () => {
        if (editable && categories && setCategories) {

            if (!categories.includes(name)) setCategories([...categories, name])
            else {
                setCategories(categories.filter(category => category !== name))

                if (sousCategories && setSousCategories) {
                    let _sousCategories: string[] = []
                    categories_json.forEach(category => {
                        if (category.name === name) {
                            const sub_categories = category.children.map(sub_category => sub_category.name)

                            sousCategories.forEach(sub_category_ => {
                                if (!sub_categories.includes(sub_category_)) _sousCategories.push(sub_category_)
                            })
                        }
                    })

                    setSousCategories(_sousCategories)
                }
            }
        }
    }

    return (<span className={categories?.includes(name) ? 'category selected' : 'category'} onClick={handleSelected}>{name}</span>)
}

export default CategoryCard