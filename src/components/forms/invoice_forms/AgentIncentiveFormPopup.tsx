import ModalPopup from '@/components/themes/ModalPopup'
import FormUi from '@/components/ui/FormUi'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { Switch } from '@heroui/switch'
import { div } from 'framer-motion/client'
import React, { useState } from 'react'

function AgentIncentiveFormPopup({is_update_invoice=false,customer_details,invoice_items, submit_callback = () => {},total_billed_amount}:any) {
    const [incentive_status,set_incentive_status]=useState<boolean>(true);
    const [incentive_percentage,set_incentive_percentage]=useState<number>(2)
     const agent_incentive_amount=Math.round(Number(total_billed_amount)*(incentive_percentage/100))
    const submit_handler = async(e: any) => {
       const agent_incentive={
        ...e,incentive_status,incentive_percentage,
        agent_id_ref:customer_details?.agent_id_ref?._id,
        agent_incentive_amount
       }
     await submit_callback(agent_incentive);
    }
  
    return (
        <ModalPopup button_title={'Next'} btn_size='md' button_classname='capitalize bg-default bg-success text-black' modal_title={'Agent Incentive Form'} >
            <FormUi submit_button_text={is_update_invoice?'Update':'Submit'} submit_handler={submit_handler}>
                {!customer_details&&<Button color="danger" variant="flat" className=' p-2 w-full rounded-xl text-center'>! Please Select Customer</Button>}
               {!invoice_items||!Array.isArray(invoice_items)||(invoice_items?.length<=0)&&<Button color="danger" variant="flat" className=' p-2 w-full rounded-xl text-center'>! Invoice items is empty</Button>}
                <>
                {customer_details&&customer_details.agent_id_ref?
                <>


                 <Switch defaultSelected={incentive_status} onValueChange={(e:boolean)=>{set_incentive_status(e)}} name='incentive_status'/>
                    {incentive_status && <>
                    <div className='flex flex-col border-default border w-full p-2 rounded-xl'> 
                        <div className='capitalize'> Agent Name: {customer_details?.agent_id_ref?.name}</div>
                       <div className='uppercase'> Agent Id: {customer_details?.agent_id_ref?.agent_id}</div>
                      
                    </div>
                       <div className='flex flex-col border-default border w-full p-2 rounded-xl'> 
                        Billed Amount: {total_billed_amount}
                       </div>
                        <div className='flex flex-col border-default border w-full p-2 rounded-xl'> 
                        Incentive Amount: {agent_incentive_amount}
                       </div>
                    <Input min={0} onChange={(e)=>{set_incentive_percentage(e.target.value)}} endContent='%' type='number' labelPlacement='outside' defaultValue={`${incentive_percentage}`} label='Incentive Percentage (%)' name='incentive_percentage' />
                    
                   
                    </>
                    }
                    
                    </>
                    :<div>No Agent Assigned</div>
            }
                
                </>
               
            </FormUi>
        </ModalPopup>
    )
}

export default AgentIncentiveFormPopup