import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { Input } from '@heroui/input'
import Barcode from "react-barcode";
import { CircleGauge } from 'lucide-react';
function TestForm() {
    const [arr_state, setArrState] = useState([])
    const change_handler = (e: any) => {
        try {
            console.log(e.target.value);
        const data = e.target.value
        const arr = data.split('-');
        console.log(arr);
        setArrState(arr)
        } catch (error) {
         console.log(error)   
        }
        
    }
    return (
        <ModalPopup size='xl' modal_title='ok' button_title='Test'>
            <div>
                <Input onChange={change_handler} autoFocus />
                <br />

                <div className='flex  gap-5'>
                    <div className=' text-white'>Id: {arr_state[0]||0}</div>
                    <div>Unit Price: {arr_state[1]}</div>
                    <div>Series: {arr_state[2]}</div>
                    <div>Box unit Quantity: {arr_state[3]}</div>

                </div>
<br />

                <Barcode value={'261001-123-01-4'} />
            </div>
        </ModalPopup>
    )
}

export default TestForm