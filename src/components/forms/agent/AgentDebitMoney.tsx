import ModalPopup from '@/components/themes/ModalPopup'
import React from 'react'
import CreditAndDebitForm from '../CreditAndDebitForm'
import ModalFormPupup from '@/components/themes/ModalFormPupup'
import { responseHandler } from '@/libs/api_handle'
import { agent_api_service } from '@/services/mixServices'

const MainForm = () => {
    return <>



    </>
}

function AgentDebitMoneyFormPopup({agent_id}:any) {


    const submit_handler=async(form_data:any)=>{
        try {
            const resp=await responseHandler(agent_api_service.debit_money,{data:form_data,id:agent_id,query:''},{toast_display:true})
    
        if(resp.status){
         window.location.reload()
        }
        } catch (error) {
            console.log(error)
        }
    }

    return <ModalFormPupup closePopup={false} submit_handler={submit_handler} button_color='default' button_title='Debit Money' modal_title='Debit Money'>
        <div className='flex gap-2 flex-col w-full' >
            <CreditAndDebitForm transaction_type={'debit'} />
        </div>
        {/* <OptionInvoiceFormPopup /> */}
    </ModalFormPupup>
}

export default AgentDebitMoneyFormPopup