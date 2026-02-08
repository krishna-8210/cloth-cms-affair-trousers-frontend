import ModalFormPupup from '@/components/themes/ModalFormPupup'
import { Input } from '@heroui/input'
import React from 'react'

function DeleteCustomerFormPopup({customer_name}:any) {
  
  return (
  <ModalFormPupup modal_title='customer Delete' button_title='Delete' button_classname='bg-danger-300 h-8'>
    <Input name='customer_name' />
  </ModalFormPupup>
  )
}

export default DeleteCustomerFormPopup