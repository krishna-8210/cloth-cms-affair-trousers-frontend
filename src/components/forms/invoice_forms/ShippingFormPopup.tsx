import ModalFormPupup from '@/components/themes/ModalFormPupup'
import ModalPopup from '@/components/themes/ModalPopup'
import FormUi from '@/components/ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import React from 'react'

function ShippingFormPopup({ submit_handler = () => { }, setData, details }: any) {

    const save_hanlder = (e: any) => {
        setData(e);
    }

    return (
        <>
            <ModalFormPupup size={'2xl'} submit_handler={save_hanlder} button_title={!details ? 'Add shipping' : 'Edit shipping'} button_classname='capitalize bg-default' btn_size={'md'} modal_title={'Shipping Details Form'} >
                <div className='grid grid-cols-2 gap-2 w-full'>
                    <Input className='w-full' defaultValue={details?.contact_name} isRequired type='text' name='contact_name' label='Contact Person Name' />
                    <Input defaultValue={details?.contact_mobile} isRequired type='number' name='contact_mobile' label='Contact Person Mobile' />
                </div>
                <Input defaultValue={details?.address1} isRequired type='text' name='address1' label='Address1' />
                <div className='grid grid-cols-2 gap-2 w-full'>
                    <Input defaultValue={details?.address2} type='text' name='address2' label='Address2' />
                    <Input defaultValue={details?.address3} type='text' name='address3' label='Address3' />
                </div>

                <div className='grid grid-cols-2 gap-2 w-full'>
                    <Input defaultValue={details?.pincode} type='number' name='pincode' label='Pincode' />
                    <Input defaultValue={details?.pincode} type='text' name='gst_number' label='GST number' />
                </div>


                <Textarea defaultValue={details?.notes} type='text'  name='notes' label='Notes' />

            </ModalFormPupup>


        </>
    )
}

export default ShippingFormPopup