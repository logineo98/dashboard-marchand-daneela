import React, { useState } from 'react'

const Switch = () => {

    const [active, setActive] = useState(false)

    const handleSwitch = () => setActive(!active)

    return (
        <div className={active ? 'switch_container active' : 'switch_container'}>
            <div className='switch' onClick={handleSwitch}></div>
        </div>
    )
}

export default Switch