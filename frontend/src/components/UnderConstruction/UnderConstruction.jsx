import React from 'react'
import underConstruction from '../../assets/underCons-removebg.png'
import { Link } from 'react-router-dom'

export default function UnderConstruction() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    return (
        <div style={style}>
            <img src={underConstruction} alt='Site under construction!' style={{ width: '25vw', height: 'auto', boxShadow: 'none' }} />
            <Link to='/'><h4>Back to Home!</h4></Link>
        </div>
    )
}
