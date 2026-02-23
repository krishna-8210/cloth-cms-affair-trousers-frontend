import { div } from 'framer-motion/client'
import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { useDispatch, useSelector } from 'react-redux'
import { responseHandler } from '@/libs/api_handle'
import { agent_api_service } from '@/services/mixServices'
import { agent_list_update_reducer } from '@/redux/DatalistSlice'


const MainForm = ({ pre_details, is_update }: any) => {
    const list_slice = useSelector((e: any) => e.datalist_slice.agent.list);
    const dispatch = useDispatch();
    const submit_handler = async (data: any) => {

        try {
            if (is_update) {
                const resp = await responseHandler(agent_api_service.update, { data: data, id: pre_details?._id, query: '' }, { toast_display: true });
                if (resp.status) {
                    window.location.reload()
                    // const data_reducer: any = [resp.data, ...list_slice,];
                    // console.log(resp)
                    // dispatch(agent_list_update_reducer(data_reducer));
                    // console.log(resp);
                }
            }
            else {
                const resp = await responseHandler(agent_api_service.create, { data: data, id: '', query: '' }, { toast_display: true });
                if (resp.status) {
                    const data_reducer: any = [resp.data, ...list_slice,];
                    console.log(resp)
                    dispatch(agent_list_update_reducer(data_reducer));
                    console.log(resp);
                }
            }


        } catch (error) {
            console.log(error)
        }

    }


    return <>
        <FormUi submit_handler={submit_handler}>
            <Input defaultValue={pre_details?.name} label='Agent Name' name='name' />
            <Input defaultValue={pre_details?.mobile} type='number' label='Mobile' name='mobile' />
            <Input defaultValue={pre_details?.address} label='Address' name='address' />
            <Input defaultValue={pre_details?.incentive_percentage} type='number' label='Default Incentive' name='incentive_percentage' />
            <Textarea defaultValue={pre_details?.notes} className='' label='Notes' name='notes' />
        </FormUi>
    </>
}

function CreateAgentFormPopup({ is_update, pre_details }: any) {
    return (
        <ModalPopup btn_size='sm' button_color={is_update ? 'none' : 'primary'} modal_title={is_update ? 'Update Agent' : 'Create Agent'} button_title={is_update ? 'Update Agent' : 'Create Agent'}>
            <MainForm is_update={is_update} pre_details={pre_details} />
        </ModalPopup>
    )
}

export default CreateAgentFormPopup