import Orders from './Orders'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, CloseButton, Box, Flex
  } from "@chakra-ui/react"
  import { useSelector, useDispatch } from 'react-redux'
  import { useState } from 'react'

function FoodOrders() {
    
    const [alert, setAlert] = useState(false)

    const foodOrders = useSelector(state => state.foodOrder)
    const orders = foodOrders.map((order) => <Orders setAlert={setAlert} key={order.id} order={order}/>)

    function handleAlert(){
        setAlert(alert => !alert)
    }

return(
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg"> 
    {alert &&  <Flex justifyContent="center"><Alert position="fixed" status="success" w="300px">
                            <AlertIcon />
                            <Box flex="1">
                              <AlertTitle>Success!</AlertTitle>
                              <AlertDescription display="block">
                                Your order has gone through! Check your email for more details.
                              </AlertDescription>
                            </Box>
                            <CloseButton onClick={handleAlert}  position="absolute" right="8px" top="8px" />
                          </Alert></Flex> }
        <Table variant="simple">
        <Thead > 
            <Tr backgroundColor='#EEF0EB'>
            <Th>Item Name</Th>
            <Th>Description</Th>
            <Th>Creator</Th>
            <Th>Location</Th>
            <Th isNumeric>Amount</Th>
            <Th>Times</Th>
            <Th>Status</Th>
            <Th>Order</Th>
            </Tr>
        </Thead>
        {orders}
        </Table>
 </Box>
)

}
export default FoodOrders