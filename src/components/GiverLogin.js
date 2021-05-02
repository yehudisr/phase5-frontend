
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {setGiver} from '../redux/giverSlice'
import { Box, Spacer, Text, Button, Input, Grid, GridItem, Link, Checkbox, FormControl, Center, FormLabel, InputGroup, Flex, InputRightElement } from "@chakra-ui/react";



function GiverLogin() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [rememberMe, setRememberMe] = useState(false)
    const [open, setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
    const [formData, setFormData] = useState({
      password: "",
      email: ""
    })

    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/login",{
          method: "POST",
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data.errors);
            
          } else {
            console.log(data)
            dispatch(setGiver(data))
            if(rememberMe){
              localStorage.setItem('currentGiver', JSON.stringify(data))
            }
    
            history.push(`/giver/${data.id}`);
          }
        })
        
        
    }

    function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  console.log(errors.length > 0)

    return (
        <Center  h="300px" >

            <Flex alignItems="center">
            
                <form onSubmit={handleSubmit}>
                    

                    <Box p={4}> <FormControl   isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input id="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="Email" />
                        </FormControl></Box><Spacer/>

                        <Box p={4}><InputGroup size="md"> 
                        <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange} 
                        pr="4.5rem"
                        placeholder="Enter password"
                        />
                         
                        </FormControl>
                    </InputGroup>
                    </Box>
                         <Box> 
                             <FormControl
              control={<Checkbox value="remember" color="primary" onChange={()=> setRememberMe(!rememberMe)}/>}
              label="Remember me"
            /></Box>
                
                    <Button type="submit" value="login" >Login</Button> 
                    <Box><Link href="#" variant="body2" onClick={handleOpen}>
                  {"Don't have an account? Sign Up"}
                 
                </Link> </Box>
                </form>  

              
          
   
          {/* <Modal
                open={open}
                onClose={handleClose}
                className={classes.modal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
               {<div className={classes.modal_body}>
                <Signup/>
                 </div>}
              </Modal> */}
      
        </Flex>
     
    </Center>
    )
}

export default GiverLogin
