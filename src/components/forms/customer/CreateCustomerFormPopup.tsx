import React, { useEffect, useState } from 'react'
import ModalPopup from '../../themes/ModalPopup'
import FormUi from '../../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { Autocomplete, AutocompleteItem, InputOtp } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { customer_api_service } from '@/services/mixServices'
import { useDispatch, useSelector } from 'react-redux'
import { customer_list_update_reducer } from '@/redux/DatalistSlice'
import ModalFormPupup from '../../themes/ModalFormPupup'
import AgentListLoaderApi from '@/ApiComponents/AgentListLoaderApi'

const MainForm = ({modal_title='Create Customer',button_title='Create Customer'}) => {
    const [selected_agent,set_selected_agent]=useState(null)
    const list_slice = useSelector((e: any) => e.datalist_slice.customer.list);
    const dispatch = useDispatch();
    const agent_list_slice = useSelector((e: any) => e?.datalist_slice?.agent?.list);
    const submit_handler = async (data: any) => {
        try {
            console.log(data,selected_agent);
            data.agent_id_ref=selected_agent;
            const resp = await responseHandler(customer_api_service.create, { data: data, id: '', query: '' }, { toast_display: true });
            if (resp.status) {
                const data_reducer: any = [resp.data, ...list_slice,];
                console.log(resp);
                dispatch(customer_list_update_reducer(data_reducer));
                console.log(resp);
            }
        } catch (error) {
            console.log(error);
        }
        useEffect(() => {
            console.log(agent_list_slice);
        }, agent_list_slice);
    }
    return <>
        <AgentListLoaderApi />
        <ModalFormPupup size='5xl' modal_title={modal_title} button_title={button_title} submit_handler={submit_handler}>
            <div className='grid grid-cols-2 w-full gap-2'>
                <Input size='sm' isRequired label='Customer Name' name='name' />
                <Input size='sm' isRequired label='Print Name' name='print_name' />
                <Input size='sm' isRequired label='Address 1' name='address1' />
                <Input size='sm' type='number' label='Mobile' name='mobile' />
                <Input size='sm' label='Address 2' name='address2' />
                <Input size='sm' type='number' label='Whatsapp' name='whatsapp_number' />
                <Input size='sm' label='Address 3' name='address3' />
                <Input size='sm' type='number' label='Pincode' name='pincode' />
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Bank Details</div>
                    <Input size='sm' label='Ifsc' name='ifsc' />
                    <Input size='sm' label='Account Number' name='ac_number' />
                    <Input size='sm' label='Bank Name' name='bank_name' />
                    <Input size='sm' label='A/c Holder Name' name='ac_holder_name' />
                </div>
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Documnents Details</div>
                    <Input size='sm' label='GST Number' name='gst_number' />
                    <Input size='sm' label='Pancard' name='pancard_number' />
                    <Input size='sm' label='Adhar Number' type='number' name='adhar_number' />
                </div>
                <div><Autocomplete onSelectionChange={(agn)=>{console.log(agn)}}  isLoading={!agent_list_slice} label='Select Agent' name='agent_id_ref'>
                    {agent_list_slice && Array.isArray(agent_list_slice) && agent_list_slice.map(e => {
                        return <AutocompleteItem onClick={()=>{set_selected_agent(e._id)}} key={e._id} >{e.name}</AutocompleteItem>
                    })}
                </Autocomplete></div>
            </div>

        </ModalFormPupup>
    </>
}
function CreateCustomerFormPopup() {

    return (
        <MainForm />

    )
}

export default CreateCustomerFormPopup