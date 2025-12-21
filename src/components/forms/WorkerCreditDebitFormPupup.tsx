import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import FormUi from '../ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import { Chip } from '@heroui/react'



const MainForm = ({ transaction_type }: any) => {
  return <>
  <div className='flex gap-2'>
    Transaction Type: 
        <Chip className='mb-5 capitalize'>{transaction_type}</Chip>
  </div>

    <FormUi>
     
      <Input label='Amount' name='amount' type='number' placeholder='amount' />
      <Textarea label='Notes' name='notes' placeholder='Notes' />
    </FormUi>



  </>
}




function WorkerCreditDebitFormPupup({ transaction_type = 'debit' }: any) {

  return (
    <ModalPopup button_title={transaction_type} button_classname='capitalize bg-default' modal_title={'Worker ' + transaction_type + ' form'} >
      <MainForm transaction_type={transaction_type}/>
    </ModalPopup>
  )
}

export default WorkerCreditDebitFormPupup