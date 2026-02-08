import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { Input } from '@heroui/input'
import Barcode from "react-barcode";
import { CircleGauge } from 'lucide-react';
function BarcodeGenerateForm() {
    const [arr_state, setArrState] = useState([]);
    const [input_value, set_input_value] = useState<string>();
    const change_handler = (e: any) => {
        try {
            const data = e.target.value;
            set_input_value(data)
            const arr = data.split('-');
            console.log(arr);
            setArrState(arr)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <ModalPopup size='xl' modal_title='ok' button_title='Barcode gen'>
            <div>
                <Input onChange={change_handler} autoFocus />
                <br />

                <div className='flex  gap-5'>
                    <div className=' text-white'>lot: {arr_state[0] || 0}</div>
                    <div>Range: {arr_state[1]}</div>
                    <div>Box unit Quantity: {arr_state[2]}</div>
                    <div>Year: {arr_state[3]}</div>

                </div>
                <br />

                <Barcode value={input_value} />
            </div>
        </ModalPopup>
    )
}

export default BarcodeGenerateForm