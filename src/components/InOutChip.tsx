import { Chip } from '@heroui/react'
import React from 'react'

function InOutChip({type}:any) {
  return (
<Chip
          size="sm"
          color={type === "in" ? "success" : "danger"}
          variant="flat"
        >
          {type.toUpperCase()}
        </Chip>
  )
}

export default InOutChip