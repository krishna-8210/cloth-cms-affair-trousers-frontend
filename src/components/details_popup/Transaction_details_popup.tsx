import React, { useEffect, useState } from 'react'
import ModalPopup from '../themes/ModalPopup'
import { responseHandler } from '@/libs/api_handle'
import { worker_transction_api_service } from '@/services/mixServices'
import { Button } from '@heroui/button'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/react";
import { datalist_type } from '@/types'
import { div } from 'framer-motion/client'


import {
  Divider,
  Chip
} from "@heroui/react";

const TransactionDetails = ({ transaction }:any) => {
  if (!transaction) return null;

  return (
    <ModalBody className="space-y-3">
      
      {/* Transaction ID */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Transaction ID</span>
        <span className="font-medium">{transaction._id}</span>
      </div>

      <Divider />

      {/* Type */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-default-500">Type</span>
        <Chip
          size="sm"
          color={transaction.transaction_type === "credit" ? "success" : "danger"}
          variant="flat"
        >
          {transaction.transaction_type.toUpperCase()}
        </Chip>
      </div>

      {/* Amount */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Amount</span>
        <span className="font-semibold">
          ₹{transaction.amount}
        </span>
      </div>

      {/* Notes */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Notes</span>
        <span className="max-w-[60%] text-right break-words">
          {transaction.notes || "-"}
        </span>
      </div>

      <Divider />

      {/* Beneficiary */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Beneficiary</span>
        <span className="font-medium capitalize">
          {transaction.beneficiar_model_key}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-default-500">Beneficiary ID</span>
        <span className="font-mono text-xs">
          {transaction.beneficiar_id}
        </span>
      </div>

      {/* Created By */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Created By</span>
        <span className="font-mono text-xs">
          {transaction.created_by_id_ref}
        </span>
      </div>

      <Divider />

      {/* Dates */}
      <div className="flex justify-between">
        <span className="text-sm text-default-500">Created At</span>
        <span>
          {new Date(transaction.createdAt).toLocaleString()}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-default-500">Updated At</span>
        <span>
          {new Date(transaction.updatedAt).toLocaleString()}
        </span>
      </div>

    </ModalBody>
  );
};






function Transaction_details_popup({ transaction_id }: any) {
    const [data, set_data] = useState();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const loader = async () => {
        try {
            const resp = await responseHandler(worker_transction_api_service.details, { id: transaction_id, data: '', query: '' });
            console.log(resp);
            set_data(resp.data);
        } catch (error) {
            console.log(error);
        }
    }
    const open_handler = () => {
        onOpen();
        loader()
    }


    return (
        <>
            <Button onPress={open_handler}>{transaction_id}</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Transaction Details</ModalHeader>
                         

                                {data && <TransactionDetails 
                                transaction={data}
                                />}
                         
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Transaction_details_popup