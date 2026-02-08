import { Button, Card, CardBody, CardHeader, Divider, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CustomerCreditFormPupup from '../forms/CustomerCreditFormPupup';
import { CircleEllipsis, Dot, Ellipsis, Menu } from 'lucide-react';
import DeleteCustomerFormPopup from '../forms/customer/DeleteCustomerFormPopup';
import UpateCustomerFormPopup from '../forms/customer/UpateCustomerFormPopup';
import { div } from 'framer-motion/client';

function CustomerDetails_max({ data,setData }: any) {
    const details = data;
    const balance = data?.balance_id_ref;
    const navigate = useNavigate()
    const transaction_handler = () => {
        navigate('transactions');
    }
    
    return (
        <>
         <Card className="w-full">
            <CardHeader className='flex justify-between'>
                <div className='text-lg'>
                    <span>Name :</span>
                    <span>{details?.name}</span>
                    <span>Customer Id :</span>
                    <span>{details?.customer_id}</span>
                </div>
                <div className='flex gap-2' >
                    <CustomerCreditFormPupup transaction_type='credit' />
                    <Button size='sm' onClick={transaction_handler} >All Transactions</Button>
                    <Popover  placement="bottom">
                        <PopoverTrigger>
                            <Button size='sm' >Action</Button>
                        </PopoverTrigger>
                        <PopoverContent className='bg-default-100'>
                            <div className="  flex flex-col gap-2">
                                <UpateCustomerFormPopup setData={setData} customer_details={details} />
                                <DeleteCustomerFormPopup customer_name={'hello'}  />
                              
                              {/* <DeleteCustomerFormPopup/> */}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </CardHeader>
            {/* <CardHeader className="flex justify-between items-center">
                <div >
                    <div className='flex items-center gap-2'>
                        <p className="">Name:</p>
                        <p className="">{details?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Customer Id:</p>
                        <p className="uppercase">{details?.customer_id}</p>
                    </div>
                </div>
            </CardHeader> */}
            <Divider />
            <CardBody className="space-y-3">
                {/* Quantities */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Mobile</span>
                    <span className="font-medium">{details?.mobile}</span>
                </div>

              

                <Divider />

                {/* References */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Avaliable amount</span>
                    <span className="font-semibold">
                        {balance?.amount}
                    </span>
                </div>

                <Divider />

                {/* Dates */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Created At</span>
                    <span className="text-sm">
                        {new Date(data?.createdAt).toLocaleString()}
                    </span>
                </div>


            </CardBody>

            

        </Card>
        
        <div className='mt-2 grid grid-cols-3 gap-2'>
            <Card>
                <CardHeader>Address</CardHeader>
                <CardBody className='flex flex-col gap-4 text-default-500'>
                   <div>Address 1 : {details?.address1}</div>
                     <div>Address 2 : {details?.address2}</div>
                       <div>Address 3 : {details?.address3}</div>
                       <div>Pin Code: {details?.pincode}</div>
                </CardBody>
            </Card>
              <Card>
                <CardHeader>Bank Details</CardHeader>
                 <CardBody className='flex flex-col gap-4 text-default-500'>
                   <div>IfSC : {details?.bank_details?.ifsc}</div>
                     <div>Bank Name : {details?.bank_details?.bank_name}</div>
                       <div>A/c Number : {details?.bank_details?.ac_number}</div>
                        <div>A/c Holder Name : {details?.bank_details?.ac_holder_name}</div>
                       
                </CardBody>
            </Card>
              <Card>
                <CardHeader>Doc details</CardHeader>
                <CardBody className='flex flex-col gap-4 text-default-500'>
                   <div>Pan Card : {details?.pancard_number}</div>
                     <div>GST Number: {details?.gst_number}</div>
                       <div>Adhar Card : {details?.adhar_number}</div>
                      
                       
                </CardBody>
            </Card>
        </div>


        <Card className='mt-2 '>
          <CardHeader>Agent Details</CardHeader>
          <CardBody className='flex flex-col gap-4 text-default-500'>
            {!details?.agent_id_ref?'Sales agent not assigned':<div>
                 <div>Agent Name : {details?.agent_id_ref?.name}</div>
                 <div>Agent ID : <span    className='uppercase'>{details?.agent_id_ref?.agent_id}</span></div>
                
                </div>}
           
          </CardBody>
        </Card>
        </>
       
    )
}
export default CustomerDetails_max