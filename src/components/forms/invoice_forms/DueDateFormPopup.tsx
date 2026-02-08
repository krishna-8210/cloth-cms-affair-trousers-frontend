import ModalFormPupup from '@/components/themes/ModalFormPupup'
import ModalPopup from '@/components/themes/ModalPopup'
import FormUi from '@/components/ui/FormUi'
import { Input, Textarea } from '@heroui/input'
import React from 'react'

function DueDateFormPopup({setData,data}:any) {
const submit_handler=(e:any)=>{
setData(e)
}
  return (
    <ModalFormPupup submit_handler={submit_handler} btn_size={'md'} button_title={'Add Due Date'} button_classname='capitalize bg-default'  modal_title={'Due Date Form'} >

      <Input defaultValue={data?.due_date} isRequired type='date' name='due_date' label='Due Date'/>
      <Input defaultValue={data?.amount} isRequired type='number' min={0} name='amount' label='Amount'/>
      <Textarea defaultValue={data?.notes} type='text' isRequired name='notes' label='Notes' />
      </ModalFormPupup>
  )
}

export default DueDateFormPopup