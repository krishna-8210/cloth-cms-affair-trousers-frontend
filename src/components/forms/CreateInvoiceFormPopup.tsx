import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import InvoiceForm from './InvoiceForm'
import OptionInvoiceFormPopup from './OptionInvoiceFormPopup'

const MainForm = ({is_update_invoice=false,pre_invoice_details=null}) => {
    const [first, setfirst] = useState('second')
    const submit_handler = (e: any) => {
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
        <InvoiceForm pre_invoice_details={pre_invoice_details} is_update_invoice={is_update_invoice}/>

    </div>
}

function CreateInvoiceFormPopup({ is_update_invoice = false,pre_invoice_details=null }) {
    return (
        <ModalPopup size={'full'} modal_title={is_update_invoice ? 'Update Invoice' : 'Create Invoice'} button_title={is_update_invoice ? 'Update Invoice' : '+ Invoice'}>
            <MainForm is_update_invoice={is_update_invoice} pre_invoice_details={pre_invoice_details}/>
            {/* <OptionInvoiceFormPopup /> */}
        </ModalPopup>
    )
}

export default CreateInvoiceFormPopup