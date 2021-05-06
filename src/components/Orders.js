import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption, Button, Badge
  } from "@chakra-ui/react"
  import { useState, useEffect } from 'react'
  import OrderForm from './OrderForm'
  import { useDisclosure } from "@chakra-ui/react"
  import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, FormLabel, Input, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, CloseButton, Box} from "@chakra-ui/react"
  import { useSelector, useDispatch } from 'react-redux'
  
function Orders({order, setAlert}) {
  const { isOpen, onOpen, onClose } = useDisclosure() 
  const [open, setOpen] = useState(false)
  const foodOrders = useSelector(state => state.foodOrder)


      const handleOpen = () => {
        onOpen()
        setOpen(open => !open)
      }

    return(
       <>

    <Tbody>
    <Tr>
      <Td>{order.name}</Td>
      <Td>{order.description}</Td>
      <Td>{order.food_giver.name}</Td>
      <Td>{order.food_giver.location}</Td>
      <Td isNumeric>{order.amount}</Td>
      <Td>{order.start_time_display} - {order.end_time_display}</Td>
      <Td>{ order.amount > 0 ? <Badge bgColor="#698B81" color="#ECF0E9">Available</Badge> : <Badge bgColor="#DE9A2D" color="#ECF0E9">Taken</Badge>}</Td>
      <Td>
        { order.amount > 0 ? <Button size="sm" variant="ghost" borderRadius="md" onClick={handleOpen}>Order</Button> : null }
      
      {open && ( <Modal
        
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bgColor="#5E8074" color="white">Place Your Order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <OrderForm handleOpen={handleOpen} order={order} setAlert={setAlert}/>
               </ModalBody>
              <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
             </ModalFooter>
          </ModalContent>
        </Modal>)}

        </Td>
        
    </Tr>
   </Tbody>
              
            </>  

    )
        
}

export default Orders