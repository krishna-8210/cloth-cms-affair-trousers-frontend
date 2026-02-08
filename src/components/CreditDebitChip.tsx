import { Chip } from '@heroui/react'
import React from 'react'

function CreditDebitChip({transaction_type}:any) {
  return (
<Chip
          size="sm"
          color={transaction_type === "credit" ? "success" : "danger"}
          variant="flat"
        >
          {transaction_type.toUpperCase()}
        </Chip>
  )
}

export default CreditDebitChip