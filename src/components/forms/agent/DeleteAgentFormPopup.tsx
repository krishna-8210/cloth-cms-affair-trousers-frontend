import ModalFormPupup from '@/components/themes/ModalFormPupup'
import { responseHandler } from '@/libs/api_handle'
import { agent_api_service } from '@/services/mixServices'
import { Checkbox, Input } from '@heroui/react'
import React from 'react'

function DeleteAgentFormPopup({ details }: any) {
    const submit_handler = async (form_data: any) => {
        try {
            if (form_data.name == details.name) {
                const resp = await responseHandler(agent_api_service.delete, { id: details?._id, data: form_data, query: '' }, { toast_display: true })
            }
            else{
                alert('Name not matching')
            }

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ModalFormPupup submit_handler={submit_handler} closePopup={false} button_title={'Delete Agent'} button_color='danger' btn_size={'sm'}>
            <span>Agent Name: {details?.name}</span>
            <Input isRequired name='name' label=' Agent name' placeholder=' Enter Agent Name' />
            <span>Note: if name match then delete will done</span>
        </ModalFormPupup>
    )
}

export default DeleteAgentFormPopup