import ModalFormPupup from '@/components/themes/ModalFormPupup'
import ModalPopup from '@/components/themes/ModalPopup'
import FormUi from '@/components/ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import React from 'react'

function TransportFormPopup({ submit_handler = () => { }, setData,data }: any) {

    const save_handler = (e: any) => {
        setData(e)
    }

    return (
        <ModalFormPupup submit_handler={save_handler} btn_size={'md'} button_title={data?'Edit Transport':'Add Transport'} button_classname='capitalize bg-default' modal_title={'Transport Details Form'} >
   
                <Input defaultValue={data?.contact_person_name} type='text' isRequired name='contact_name' label='Contact Person Name' />
                <Input defaultValue={data?.contact_person_mobile} type='text' isRequired name='contact_mobile' label='Contact Person Mobile' />
                <Input defaultValue={data?.costamount}type='text' isRequired name='charged_amount' label='Charged Amount' />
                <Input defaultValue={data?.vehical_number} type='text' isRequired name='vehical_number' label='Vehical Number' />
                 <Textarea defaultValue={data?.notes} type='text' isRequired name='notes' label='Notes' />
    
        </ModalFormPupup>
    )
}

export default TransportFormPopup