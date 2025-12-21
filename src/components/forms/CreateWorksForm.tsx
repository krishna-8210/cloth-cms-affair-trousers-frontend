import React, { useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { div } from 'framer-motion/client'
import FormUi from '../ui/FormUi'
import { Input } from '@heroui/input'
import { InputOtp, Select, SelectItem } from '@heroui/react'
import { responseHandler } from '@/libs/api_handle'
import { work_api_service } from '@/services/mixServices'
import { useDispatch } from 'react-redux'
import { work_list_update_reducer } from '@/redux/DatalistSlice'


const MainForm = () => {
  const [range, setRange] = useState({ series: '', price: '' });
    const dispatch=useDispatch();
  const submit_handler = async (data: any) => {

  try {
    const resp = await responseHandler(work_api_service.create, { data: data, id: '', query: '' },{toast_display:true});
    console.log(resp);
     
    if(resp.status){
      const obj:any={...resp.data?.work,details:{...resp.data?.details}};
    dispatch(work_list_update_reducer([obj]))
    }
     } 
    catch (error) {
    
  }
  }


  return <div>
    <FormUi submit_handler={submit_handler} >
      <Input label="Lot name" isRequired name='name' />
       {/* <Input label="Lot Number" type='number' isRequired name='lot_number' /> */}
       
        <InputOtp description="Lot Number" label="Lot Number"  length={6} name='lot_number' />
      <Input type='number' label="Unit Quantity" isRequired name='quantity' />
      <Input label="Description" isRequired name='description' />
      <Input label="Notes" isRequired name='notes' />
      <div>
        <div className='m-1'>Range: <span>{range.price}{range.series}</span> </div>
        <div className='flex gap-2'>
 <Input type='number' 
        label='Selling Price'
        onValueChange={(price) => {
          setRange(e=>({...e,price:price}))
        }} name='selling_price'  />
        <Input 
        label='Series'
        onValueChange={(series) => {
         setRange(e=>({...e,series:series}))
        }}
        type='number' name='series'  />

        </div>
       
      </div>
    </FormUi>

  </div>

}


export default function CreateWorksForm() {
  return (
    <>
    
  
    <ModalPopup button_title={'Create Lot'} modal_title={'Create Lot Form'} >
      <MainForm />
    </ModalPopup>
      </>
  )
}

