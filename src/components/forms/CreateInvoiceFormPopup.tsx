import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import InvoiceForm from './InvoiceForm'
import OptionInvoiceFormPopup from './OptionInvoiceFormPopup'

const MainForm = () => {
const [first, setfirst] = useState('second')
const submit_handler=(e:any)=>{
    console.log(e.data)
    setfirst('')
}

 const [value, setValue] = useState("");

  const submit2 = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(value); // submitted data

    setValue(""); // ✅ clears input
  };

    return <div className='w-full h-[90vh] overflow-scroll '>
<InvoiceForm/>

    </div>
}

function CreateInvoiceFormPopup() {
    return (
        <ModalPopup size={'full'} modal_title='Create Invoice' button_title='+ Invoice'>
            <MainForm />
            <OptionInvoiceFormPopup/>
        </ModalPopup>
    )
}

export default CreateInvoiceFormPopup