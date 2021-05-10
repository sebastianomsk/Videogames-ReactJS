import React from 'react';
import './Checkbox2.css';

 function Checkbox2({checked, onChange, label}) {
    return (
        <div className='checkbox'>
            <div className='border' onClick={()=>onChange(!checked)}>
                <div className={`indicator ${checked?'checked':''}`}></div>
            </div>
            <div className='label'>{label}</div>
        </div> 
    )
}
export default React.memo(Checkbox2);