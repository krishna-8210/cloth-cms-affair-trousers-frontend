import { Button, Card, CardBody, CardHeader, Divider } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function CustomerDetails_mini({ data }: any) {
    const details = data;
    const balance = data?.balance_id_ref;
    const navigate=useNavigate()
    const view_handler = () => {
    navigate(details._id)
    }
    return (
        <Card className="w-full">
            <CardHeader className="flex justify-between items-center">
                <div >
                    <div className='flex items-center gap-2'>
                        <p className="">Name:</p>
                        <p className="">{details?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Customer Id:</p>
                        <p className="uppercase">{details?.customer_id}</p>
                    </div>
                      <div className='flex items-center gap-2'>
                        <p className="">Agent Assigned:</p>
                        <p className="uppercase">{details?.agent_id_ref?'Yes':'No'}</p>
                    </div>
                </div>
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
                <Divider />
                <div className='flex justify-end'>
                    <Button onPress={view_handler}>View</Button>
                </div>
            </CardBody>

        </Card>
    )
}
export default CustomerDetails_mini