import { Chip, Input, Textarea } from '@heroui/react'
import React from 'react'

function CreditAndDebitForm({ transaction_type }: any) {
    const today = new Date().toISOString().split('T')[0];
    return (
        <>
            <div className='flex gap-2'>
                Transaction Type:
                <Chip className='mb-5 capitalize'>{transaction_type}</Chip>
            </div>



            <Input autoComplete='false' isRequired label='Amount' name='amount' type='number' placeholder='amount' />
            <Input
                isRequired
                label="Payment Date"
                name="date"
                type="date"
                defaultValue={today}
            />
            <Textarea isRequired label='Notes' name='notes' placeholder='Notes' />
        </>
    )
}

export default CreditAndDebitForm