import WorkerCreditDebitFormPupup from '@/components/forms/WorkerCreditDebitFormPupup';
import { Button, Card, CardBody, CardHeader } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function WorkerDetails_max_render({ data }: any) {
    const role = data?.role_id_ref;
    const navigate = useNavigate();

    const transaction_handler = () => {
        navigate('transactions')
    }

    return <Card className='border border-default w-full'>
        <CardHeader className='flex justify-between'>
            <div className='text-lg'>
                <span>Name :</span>
                <span>{data.name}</span>
            </div>
            <div className='flex gap-2' >
               <WorkerCreditDebitFormPupup transaction_type='debit'/>
                <WorkerCreditDebitFormPupup transaction_type='credit'/>
                <Button size='sm' onClick={transaction_handler} >All Transactions</Button>
            </div>

        </CardHeader>
        <CardBody>

            <div>
                <span>Mobile Number :</span>
                <span>{data.mobile}</span>
            </div>
            <div>
                <span>Address :</span>
                <span>{data.address}</span>
            </div>
            <div>
                <div>
                    <span>Role :</span>
                    <span>{role.title}</span>
                </div>
            </div>
            <div className='w-full border w-full p-5 rounded-xl border-default mt-2'>
                <div>Balance: {data?.balance_amount} rs</div>
            </div>
        </CardBody>
    </Card>
}

export default WorkerDetails_max_render