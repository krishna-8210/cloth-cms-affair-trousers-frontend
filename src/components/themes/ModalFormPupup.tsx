import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import FormUi from "../ui/FormUi";
import { useState } from "react";

export default function ModalFormPupup({closePopup=true,  onClosePopup=()=>{},button_classname='', button_title, modal_title, children,btn_size='sm', size = 'sm', button_color = 'primary',submit_handler=()=>{} }:any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
 

const save_handler=async(e:any)=>{
    try {
        await submit_handler(e);
        if(closePopup){
       onClose(); 
        }
   
    } catch (error) {
    }
}

  return (
    <>
      <Button  className={button_classname} color={button_color} size={btn_size} onPress={onOpen}>{button_title}</Button>
      <Modal  size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modal_title}</ModalHeader>
              <ModalBody>
             <FormUi submit_handler={save_handler}> 
     {children}
             </FormUi>
             
           

              </ModalBody>
              <ModalFooter>
                <Button  color="danger" variant="light" onPress={() => {
                  onClosePopup(onClose)
                  onClose()
                   setIsLoading(false)
                }}>
                  Close
                </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
