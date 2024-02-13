import React, { FC } from 'react'

type COMPONENT_TYPE = {
    active?: boolean
    editable?: boolean

    setActive?: React.Dispatch<React.SetStateAction<boolean>>
}

const Switch: FC<COMPONENT_TYPE> = (props) => {
    const { active, editable, setActive } = props
    const active_ = active ? true : false

    const handleSwitch = () => editable && setActive && setActive(!active_)

    return (
        <div className={active ? 'switch_container active' : 'switch_container'} onClick={handleSwitch}>
            <div className='switch'></div>
        </div>
    )
}

export default Switch