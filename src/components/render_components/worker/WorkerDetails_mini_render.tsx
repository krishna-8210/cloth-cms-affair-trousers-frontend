import { Button, Card, CardBody } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function WorkerDetails_render({ data }: any) {
      const role = data?.role_id_ref

    return <Card className='border border-default w-full'>
        <CardBody>
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
        </CardBody>

    </Card>
}

export default WorkerDetails_render