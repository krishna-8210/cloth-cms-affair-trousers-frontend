import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { Chip, toast } from '@heroui/react'
import CreditAndDebitForm from './CreditAndDebitForm'
import { responseHandler } from '@/libs/api_handle'
import { customer_api_service, worker_transction_api_service } from '@/services/mixServices'
import { useParams } from 'react-router-dom'



const MainForm = ({ transaction_type }: any) => {
  const params = useParams();
  console.log(params);
  const credit_handler = async (form_data: any) => {
      console.log(params);
    try {
      const resp = await responseHandler(customer_api_service.credit_balance, { data: { ...form_data, customer_id: params.customer_id }, query: '', id: '' }, { toast_display: true })
      console.log(resp);
    } catch (error) {
      console.log(error)
    }

  }

  const submit_handler = (form_data: any) => {
    credit_handler(form_data);
    // console.log(form_data)
  }


  return <>
    <FormUi submit_handler={submit_handler}>
      <CreditAndDebitForm transaction_type={'credit'} />
    </FormUi>
  </>
}

function CustomerCreditFormPupup({ transaction_type }: any) {




  return (
    <ModalPopup button_title={'credit'} button_classname='capitalize bg-default' modal_title={'Customer ' + transaction_type + ' form'} >
      <MainForm transaction_type={'credit'} />
    </ModalPopup>
  )
}

export default CustomerCreditFormPupup