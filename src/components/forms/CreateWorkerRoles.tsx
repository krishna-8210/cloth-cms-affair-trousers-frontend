import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { div } from 'framer-motion/client'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import { InputOtp, Select, SelectItem } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { work_api_service, worker_role_api_service } from '@/services/mixServices'
import { useDispatch } from 'react-redux'
import { work_list_update_reducer } from '@/redux/DatalistSlice'




const MainForm = () => {
 
    const dispatch=useDispatch();
  const submit_handler = async (data: any) => {

  try {
    const resp = await responseHandler(worker_role_api_service.create, { data: data, id: '', query: '' },{toast_display:true});
    console.log(resp);
     
    if(resp.status){
    //   const obj:any={...resp.data?.work,details:{...resp.data?.details}};
    // dispatch(work_list_update_reducer([obj]))
    }
     } 
    catch (error) {
    
  }
  }


  return <div>
    <FormUi submit_handler={submit_handler} >
      <Input label="Role Title" isRequired name='title' />
      <Input label="Details" isRequired name='details' />
    </FormUi>

  </div>

}

function CreateWorkerRoles() {
  return (
      <ModalPopup button_title={'Create Worker Role'} modal_title={'Create Worker Role'} >
          <MainForm />
        </ModalPopup>
  )
}

export default CreateWorkerRoles