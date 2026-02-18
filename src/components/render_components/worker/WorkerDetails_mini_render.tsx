import BalanceShow from '@/components/BalanceShow';
import { select_worker_handler_reducer } from '@/redux/DatalistSlice';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider } from '@heroui/react'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'


/** */
function WorkerDetails_render({ data }: any) {
    const role = data?.role_id_ref
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const view_handler = () => {
        dispatch(select_worker_handler_reducer(data))
        navigate(data?._id);
    }
    return <Card className='border border-default w-full'>
        {/* <CardBody>
            <div>
                <span>Name :</span>
                <span>{data.name}</span>
            </div>
            <div>
                <span>Mobile Number :</span>
                <span>{data.mobile}</span>
            </div>
            <div>
                <span>Address :</span>
                <span>{data.address}</span>
            </div>
            <div>
                <span>Role :</span>
                <span>{role.title}</span>
            </div>
            <div>
            <div className='w-full border w-full p-5 rounded-xl border-default mt-2'>
                <div>Avaliable Balance: {data?.balance_amount} rs</div>
            </div>
            </div>
        </CardBody> */}
       
            <CardHeader className="flex justify-between items-center">
                <div >
                    <div className='flex items-center gap-2'>
                        <p className="">Name:</p>
                        <p className="">{data?.name}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Customer Id:</p>
                        <p className="uppercase">{data?.customer_id}</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className="">Agent Assigned:</p>
                        <p className="uppercase">{data?.agent_id_ref ? 'Yes' : 'No'}</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-3">
                {/* Quantities */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Mobile</span>
                    <span className="font-medium">{data?.mobile}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Address</span>
                    <span className="font-semibold">
                        {data.address}
                    </span>
                </div>

                <Divider />

                {/* References */}
                <div className="flex justify-between">
                    <span className="text-sm text-default-500">Balance</span>
                    <span className="font-semibold">
                        {data?.amount}
                        <BalanceShow balance={data?.balance_amount||0}/>
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

  
        <CardFooter>
            {data?.recently_added ? <Chip color='primary'>New</Chip> : ''}
        </CardFooter>
    </Card>
}

export default WorkerDetails_render


