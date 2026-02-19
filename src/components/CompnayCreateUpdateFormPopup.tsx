import React, { useEffect, useState } from 'react'

import { Input, Textarea } from '@heroui/input'
import { Autocomplete, AutocompleteItem, InputOtp } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { compnay_api_service, customer_api_service } from '@/services/mixServices'
import { useDispatch, useSelector } from 'react-redux'
import { customer_list_update_reducer } from '@/redux/DatalistSlice'

import AgentListLoaderApi from '@/ApiComponents/AgentListLoaderApi'
import ModalFormPupup from './themes/ModalFormPupup'


type bank_details_type = {
    name: string,
    account_number: String,
    ifsc_code: string

}


const MainForm = ({ is_update, pre_data = null }: any) => {

    // const [info,setInfo]=useState(pre_data);
    const info = pre_data;


    const submit_handler = async (data: any) => {
        try {
            const bank_details: bank_details_type = {
                name: data.bank_name,
                account_number: data.account_number,
                ifsc_code: data.ifsc_code
            }
            if (info) {
                const resp = await responseHandler(compnay_api_service.update, { data: { ...data, bank_details }, id: info?._id, query: '' }, { toast_display: true });
                if (resp.status) {
                    window.location.reload();
                    console.log(resp);
                }
            }
            else {
                const resp = await responseHandler(compnay_api_service.create, { data: { ...data, bank_details }, id: '', query: '' }, { toast_display: true });
                if (resp.status) {
                    window.location.reload();
                    console.log(resp);
                }
            }

        } catch (error) {
            console.log(error);
        }

    }


    return <>
        <ModalFormPupup size='5xl' modal_title={'Update info'} button_title={'Update info'} submit_handler={submit_handler}>
            <div className='grid grid-cols-2 w-full gap-2'>
                <Input size='sm' defaultValue={info?.compnay_print_name} isRequired label='Print Compnay Name' name='compnay_print_name' />

                <Input size='sm' defaultValue={info?.address1} isRequired label='Address 1' name='address1' />

                <Input size='sm' defaultValue={info?.mobile1} type='number' label='Mobile 1' name='mobile1' />
                <Input size='sm' defaultValue={info?.mobile2} type='number' label='Mobile 2' name='mobile2' />

                <Input size='sm' defaultValue={info?.address2} label='Address 2' name='address2' />

                <Input size='sm' defaultValue={info?.address3} label='Address 3' name='address3' />
            
              
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Bank Details</div>
                    <Input size='sm' defaultValue={info?.bank_details?.ifsc_code} label='Ifsc' name='ifsc_code' />
                    <Input size='sm' defaultValue={info?.bank_details?.account_number} label='Account Number' name='account_number' />
                    <Input size='sm' defaultValue={info?.bank_details?.name} label='Bank Name' name='bank_name' />

                </div>
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Documnents Details</div>
                    <Input size='sm' defaultValue={info?.gst_number} label='GST Number' name='gst_number' />


                </div>
  <div className='w-full '>
              <Input size='sm' defaultValue={info?.email} type='email' label='Email' name='email' />
              </div>
            </div>

        </ModalFormPupup>
    </>
}
function CompnayCreateUpdateFormPopup({ is_update, pre_data }: any) {

    return (
        <MainForm is_update={is_update} pre_data={pre_data} />

    )
}

export default CompnayCreateUpdateFormPopup