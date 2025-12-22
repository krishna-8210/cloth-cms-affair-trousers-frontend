import { Chip, Input, Textarea } from '@heroui/react'
import React from 'react'

function CreditAndDebitForm({transaction_type}:any) {
  return (
  <>
  <div className='flex gap-2'>
    Transaction Type: 
        <Chip className='mb-5 capitalize'>{transaction_type}</Chip>
  </div>

    
     
      <Input isRequired label='Amount' name='amount' type='number' placeholder='amount' />
      <Textarea isRequired label='Notes' name='notes' placeholder='Notes' />
  </>
  )
}

export default CreditAndDebitForm