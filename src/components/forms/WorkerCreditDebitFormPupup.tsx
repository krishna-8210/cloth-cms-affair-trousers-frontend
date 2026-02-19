import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { Chip, toast } from '@heroui/react'
import CreditAndDebitForm from './CreditAndDebitForm'
import { responseHandler } from '@/libs/api_handle'
import { worker_transction_api_service } from '@/services/mixServices'
import { useParams } from 'react-router-dom'



const MainForm = ({ transaction_type }: any) => {

const params=useParams();
  const credit_handler = async (form_data: any) => {
    try {
      const resp = await responseHandler(worker_transction_api_service.individual_credit_amount, { data: {...form_data,worker_id:params.worker_id}, query: '', id: '' }, { toast_display: true })
      console.log(resp);

    } catch (error) {
      console.log(error)
    }

  }
  const debit_handler = async(form_data: any) => {
  try {
      const resp = await responseHandler(worker_transction_api_service.debit_amount, { data: {...form_data,worker_id:params.worker_id}, query: '', id: '' }, { toast_display: true })
      console.log(resp);
      if(resp.status){
        window.location.reload();
      }

    } catch (error) {
      console.log(error)
    }
  }
  const submit_handler = (form_data: any) => {
    if (transaction_type == 'credit') {
      credit_handler(form_data);
    }
    if (transaction_type == 'debit') {
      debit_handler(form_data);
    }
  }


  return <>
    <FormUi submit_handler={submit_handler}>
      <CreditAndDebitForm transaction_type={transaction_type} />
    </FormUi>
  </>
}

function WorkerCreditDebitFormPupup({ transaction_type }: any) {




  return (
    <ModalPopup button_title={transaction_type} button_classname='capitalize bg-default' modal_title={'Worker ' + transaction_type + ' form'} >
      <MainForm transaction_type={transaction_type} />
    </ModalPopup>
  )
}

export default WorkerCreditDebitFormPupup