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
import { dataDetails_type } from '@/types'

interface propsType{
    setData:React.Dispatch<React.SetStateAction<dataDetails_type>>;
    customer_details:any;
}


const MainForm = ({ customer_details = {},setData }: propsType) => {
    console.log(customer_details);
    const [selected_agent, set_selected_agent] = useState(customer_details?.agent_id_ref?._id||null)
    const list_slice = useSelector((e: any) => e.datalist_slice.customer.list);
    const dispatch = useDispatch();
    const agent_list_slice = useSelector((e: any) => e?.datalist_slice?.agent?.list);
    const submit_handler = async (data: any) => {
        try {
            console.log(data, selected_agent);
            data.agent_id_ref = selected_agent;

            const resp = await responseHandler(customer_api_service.update, { data: data, id: customer_details?._id, query: '' }, { toast_display: true });
            if (resp.status) {  
                console.log(resp);
                if(setData){
                    setData({data:resp.data,status:'loaded',loading:false})
                }
            }
        } catch (error) {
            console.log(error);
        }
    
    }
    useEffect(()=>{
console.log('mounted');
return ()=>{
    console.log('unmount');
}
    },[])
    return <>
        <AgentListLoaderApi />
        <ModalFormPupup closePopup={false} size='5xl' modal_title={'Update Customer'} button_title={'Update'} submit_handler={submit_handler} button_classname='bg-default-300'>
            <div className='grid grid-cols-2 w-full gap-2'>
                <Input size='sm' isRequired label='Customer Name' name='name' defaultValue={customer_details?.name}/>
                <Input size='sm' isRequired label='Print Name' name='print_name' defaultValue={customer_details?.print_name}/>
                <Input size='sm' isRequired label='Address 1' name='address1' defaultValue={customer_details?.address1}/>
                <Input size='sm' type='number' label='Mobile' name='mobile' defaultValue={customer_details?.mobile}/>
                <Input size='sm' label='Address 2' name='address2' defaultValue={customer_details?.address2}/>
                <Input size='sm' type='number' label='Whatsapp' name='whatsapp_number' defaultValue={customer_details?.whatsapp_number}/>
                <Input size='sm' label='Address 3' name='address3' defaultValue={customer_details?.address3}/>
                <Input size='sm' type='number' label='Pincode' name='pincode' defaultValue={customer_details?.pincode}/>
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Bank Details</div>
                    <Input size='sm' label='Ifsc' name='ifsc' defaultValue={customer_details?.bank_details?.ifsc} />
                    <Input size='sm' label='Account Number' name='ac_number' defaultValue={customer_details?.bank_details?.ac_number} />
                    <Input size='sm' label='Bank Name' name='bank_name' defaultValue={customer_details?.bank_details?.bank_name} />
                    <Input size='sm' label='A/c Holder Name' name='ac_holder_name' defaultValue={customer_details?.bank_details?.ac_holder_name} />
                </div>
                <div className='flex flex-col gap-2 p-2 border-2 border-default-200  rounded-xl'>
                    <div>Documnents Details</div>
                    <Input size='sm' label='GST Number' name='gst_number' defaultValue={customer_details?.gst_number} />
                    <Input size='sm' label='Pancard' name='pancard_number' defaultValue={customer_details?.pancard_number} />
                    <Input size='sm' label='Adhar Number' type='number' name='adhar_number' defaultValue={customer_details?.adhar_number} />
                </div>

                <div><Autocomplete onSelectionChange={(agn)=>{console.log(agn)}} defaultSelectedKey={selected_agent} isLoading={!agent_list_slice} label='Select Agent' name='agent_id_ref'>
                    {agent_list_slice && Array.isArray(agent_list_slice) && agent_list_slice.map((e,n) => {
                        // console.log(e)
                        return <AutocompleteItem  onClick={() => { set_selected_agent(e._id) }} key={e._id} >{e.name}</AutocompleteItem>
                    })}
                </Autocomplete></div>
            </div>
        

        </ModalFormPupup>
    </>
}
function UpateCustomerFormPopup({ customer_details,setData }: any) {

    return (
       customer_details?<MainForm setData={setData} customer_details={customer_details} />:'Custoemr Id not given'
    )
}

export default UpateCustomerFormPopup