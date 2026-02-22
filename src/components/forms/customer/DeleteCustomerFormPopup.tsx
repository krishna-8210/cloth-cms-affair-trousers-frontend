import ModalFormPupup from '@/components/themes/ModalFormPupup'
import { responseHandler } from '@/libs/api_handle'
import { customer_api_service } from '@/services/mixServices'
import { Input } from '@heroui/input'
import React from 'react'

function DeleteCustomerFormPopup({ customer_name, customer_id }: any) {

  const deleteHandler = async (form_data: any) => {

    try {
      if (customer_name != form_data.customer_name) {
        alert('Please enter correct customer name')
      }
      else {
        const resp = await responseHandler(customer_api_service.delete, { id: customer_id, data: '', query: '' },{toast_display:true});

      }

    } catch (error) {

    }
  }
  return (
    <ModalFormPupup submit_handler={deleteHandler} modal_title='customer Delete' button_title='Delete' button_classname='bg-danger-300 h-8'>
     <div>Customer Name : {customer_name}</div>
      <Input placeholder='Customer name' label='Cutomer name' name='customer_name' />
      <span>Note: if name match then  delete will done</span>
    </ModalFormPupup>
  )
}

export default DeleteCustomerFormPopup