import { Button, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import AgentDebitMoneyFormPopup from '../forms/agent/AgentDebitMoney';
import CreateAgentFormPopup from '../forms/CreateAgentFormPopup';
import BalanceShow from '../BalanceShow';
import { EllipsisVertical } from 'lucide-react';
import UpateCustomerFormPopup from '../forms/customer/UpateCustomerFormPopup';
import DeleteCustomerFormPopup from '../forms/customer/DeleteCustomerFormPopup';
import UpdateAgentIncentiveFormPopup from '../forms/agent/UpdateAgentIncentiveFormPopup';
import DeleteAgentFormPopup from '../forms/agent/DeleteAgentFormPopup';

function AgentDetails_mini({ data, is_max_view }: any) {
    const details = data;
    const balance = data?.balance_id_ref;
    const navigate = useNavigate()
    const view_handler = () => {
        navigate(details._id)
    }
    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-start">
                <div >
                    <div className='flex items-center gap-2'>
                        <p className="">Name:</p>
                        <p className="">{details?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Agent Id:</p>
                        <p className="uppercase">{details?.agent_id}</p>
                    </div>
                    <div className='flex items-center gap-2 '>
                        <p className="">Incentive Percentage :</p>
                        <p className="uppercase">{details?.incentive_percentage}%</p>
                    </div>
                </div>
                {is_max_view && <div className='flex gap-2 items-center'>
                    <AgentDebitMoneyFormPopup agent_id={details._id} />
                    <Button onPress={() => { navigate('transactions') }} size='sm'>Transactions</Button>
                    <Button onPress={() => { navigate('incentives') }} size='sm'>Incentives</Button>
                    <div>
                   

                          
                                   
                                <Popover placement="bottom" >
                                    <PopoverTrigger className='outline-none'>
                                          <EllipsisVertical/>  
                                    </PopoverTrigger>
                                    <PopoverContent className='bg-default-100'>
                                        <div className="  flex flex-col gap-2">
                                            <CreateAgentFormPopup pre_details={details} is_update={true} />
                                            {/* <DeleteCustomerFormPopup customer_name={details?.name} customer_id={details?._id} /> */}

                                            <DeleteAgentFormPopup details={details}/>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                       
                       
                    </div>

                </div>}
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
                {/* Quantities */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Mobile</span>
                    <span className="font-medium">{details?.mobile}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Address</span>
                    <span className="font-semibold">
                        {details.address}
                    </span>
                </div>

                <Divider />

                {/* References */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Avaliable amount</span>
                    <span className="font-semibold">
                        <BalanceShow balance={balance?.amount} />
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
                <Divider />
                {!is_max_view &&
                    <div className='flex justify-end'>
                        <Button onPress={view_handler}>View</Button>
                    </div>
                }

            </CardBody>

        </Card>
    )
}
export default AgentDetails_mini