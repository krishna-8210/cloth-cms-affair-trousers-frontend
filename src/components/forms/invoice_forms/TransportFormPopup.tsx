import ModalFormPupup from '@/components/themes/ModalFormPupup'
import ModalPopup from '@/components/themes/ModalPopup'
import FormUi from '@/components/ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import React from 'react'

function TransportFormPopup({ submit_handler = () => { }, setData, data }: any) {

    const save_handler = (e: any) => {
        setData(e)
    }

    return (
        <ModalFormPupup submit_handler={save_handler} btn_size={'md'} button_title={data ? 'Edit Transport' : 'Add Transport'} button_classname='capitalize bg-default' modal_title={'Transport Details Form'} >

            <Input defaultValue={data?.contact_person_name} type='text' name='name' label='Transport Name' />
            <Input defaultValue={data?.costamount} type='number' name='charged_amount' label='Charged Amount' />
            <Textarea defaultValue={data?.notes} type='text' name='notes' label='Notes' />

        </ModalFormPupup>
    )
}

export default TransportFormPopup