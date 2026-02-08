import { div } from 'framer-motion/client'
import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { useDispatch, useSelector } from 'react-redux'
import { responseHandler } from '@/libs/api_handle'
import { agent_api_service } from '@/services/mixServices'
import { agent_list_update_reducer } from '@/redux/DatalistSlice'


const MainForm = () => {
 const list_slice = useSelector((e: any) => e.datalist_slice.agent.list);
    const dispatch = useDispatch();
    const submit_handler = async (data: any) => {

        try {
            const resp = await responseHandler(agent_api_service.create, { data: data, id: '', query: '' }, { toast_display: true });
            if (resp.status) {
                const data_reducer: any = [resp.data, ...list_slice,];
                console.log(resp)
                dispatch(agent_list_update_reducer(data_reducer));
                console.log(resp);
            }


        } catch (error) {
            console.log(error)
        }

    }


    return <>
        <FormUi submit_handler={submit_handler}>
            <Input label='Agent Name' name='name' />
            <Input type='number' label='Mobile' name='mobile' />
            <Input label='Address' name='address' />
            <Input type='number' label='Incentive' name='incentive_percentage' />
            <Textarea className='' label='Notes' name='notes' />
        </FormUi>
    </>
}

function CreateAgentFormPopup() {
  return (
   <ModalPopup modal_title='Create Agent' button_title='Create Agent'>
        <MainForm />
      </ModalPopup>
  )
}

export default CreateAgentFormPopup