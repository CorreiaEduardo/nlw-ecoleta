import React, { useState } from 'react'
import { IconType } from 'react-icons/lib/cjs'
import './styles.css'

interface Props {
    isVisible: boolean;
    title: string;
    Icon: IconType;
    timer: number;
    timerLabel: string
}

const InfoModal: React.FC<Props> = ({ isVisible, title, Icon, timerLabel, timer }) => {

    const [counter, setCounter] = useState(timer)

    if (isVisible)
        setTimeout(() => setCounter(counter - 1), 1000)

    if (!isVisible)
        return null

    return (
        <div className='overlay'>
            <div className='overlay-content'>
                <Icon size={64} color='#34CB79' />
                <h2 className='modal-title'>{title}</h2>
                <p>{`${timerLabel} ${counter}...`}</p>
            </div>
        </div>
    )
}

export default InfoModal;