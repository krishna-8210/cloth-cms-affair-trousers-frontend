import React from 'react'
import ModalPopup from '../themes/ModalPopup'
import { div } from 'framer-motion/client'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import { responseHandler } from '@/libs/api_handle'
import { product_api_service } from '@/services/mixServices'


const MainForm = () => {




  const submit_handler=async(data:any)=>{
   try {
    console.log(data)

    const resp=await responseHandler(product_api_service.create,{data:data,id:'',query:''},{toast_display:true});
    if(resp.status){
   
    }
   } catch (error) {
    
   }
  }
  return <div>
    <FormUi submit_handler={submit_handler}>
      <Input label='Product Name' name='name' />
      <Input type='number' min={0} label='Product Price' name='price' />
      <Input label='Details' name='details' />
      <Input label='Unit in Box' name='unit_in_box' />
    </FormUi>
  </div>

}

function CreateProduct_form_popup() {
  return (
    <ModalPopup modal_title='Create Product' button_title='Create Product'>
      <MainForm />
    </ModalPopup>
  )
}

export default CreateProduct_form_popup