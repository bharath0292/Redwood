import React from 'react'
import '../ui/Pop.css'
function Pop(props) {
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                Pop
            </div>
        </div>
    ) : "";
}


export default Pop
