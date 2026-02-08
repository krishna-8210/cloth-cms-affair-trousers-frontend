import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function ModalPopup({onClosePopup=()=>{},button_classname='', button_title, modal_title, children,btn_size='sm', size = 'sm', button_color = 'primary' }:any) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  
  return (
    <>
      <Button  className={button_classname} color={button_color} size={btn_size} onPress={onOpen}>{button_title}</Button>
      <Modal  size={size} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{modal_title}</ModalHeader>
              <ModalBody>
                <div className="">
                  {children}
                </div>

              </ModalBody>
              <ModalFooter>
                <Button  color="danger" variant="light" onPress={() => {
                  onClosePopup(onClose)
                  onClose()
                  
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
