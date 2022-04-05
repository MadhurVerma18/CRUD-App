import {
    Typography,
    Box,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    Paper,
    TableHead,
    Button
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { orange } from "@mui/material/colors";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const View = () => {
    const useStyle = makeStyles({
  
        stuListColor:{
          backgroundColor: orange[400],
          color: "white",
        },
        tableHeadCell:{
           color: "white",
           fontWeight:'bold',
           fontSize: 16, 
        },
      });
      const classes = useStyle();
      const {id} = useParams();
      const navigate = useNavigate();
      // console.log(id);
      const [student, setStudent] = useState([]);
      useEffect ( () => {
       getStudent();
      },[id])
      async function getStudent(){
        try{
          const student = await axios.get(`http://localhost:3333/students/${id}`)
         setStudent(student.data);
        } catch(error){
             console.log("something went wrong")
        }
      }
      function handleClick(){
        navigate("/");
      }
  return (
      
    <>
    <Box textAlign="center" className={classes.stuListColor} mb={2} p={2}>
              <Typography variant="h4">Student Details</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead >
                  <TableRow style={{backgroundColor: '#616161'}}>
                   <TableCell className={classes.tableHeadCell} align="center" >No.</TableCell>
                    <TableCell className={classes.tableHeadCell} align="center" >Name</TableCell>
                    <TableCell className={classes.tableHeadCell} align="center" >Email</TableCell>
                  </TableRow> 
                </TableHead>
                <TableRow>
                    <TableCell align="center" >{id}</TableCell>
                    <TableCell align="center" >{student.stuname}</TableCell>
                    <TableCell align="center" >{student.email}</TableCell>
                </TableRow>
              </Table>
            </TableContainer>
            <Box m={3}>
              <Button  variant="contained" color="primary" onClick={handleClick}>Back to home</Button>
            </Box>
    </>
  )
}

export default View