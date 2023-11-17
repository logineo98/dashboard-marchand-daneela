import React, { FC, useEffect } from 'react'
// my importations
import Header from './Header'

type COMPONENT_TYPE = {
    children: JSX.Element | JSX.Element[]
    page_name: string
}

const PageContainer: FC<COMPONENT_TYPE> = (props) => {
    const { children, page_name } = props

    useEffect(() => {
        document.title = page_name
    }, [page_name])

    return (
        <div className='page_container'>
            <Header page_name={page_name} />

            <div className='page_content_container'>
                {children}
            </div>
        </div>
    )
}

export default PageContainer