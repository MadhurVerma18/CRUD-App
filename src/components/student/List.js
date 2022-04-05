import {
    Typography,
    Box,
    Grid,
    TableContainer,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    IconButton,
    Tooltip,
    TableHead,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { orange } from "@mui/material/colors";
  import VisibilityIcon from '@mui/icons-material/Visibility';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  import { Link } from "react-router-dom";
  import axios from "axios";
  import {useState,useEffect} from "react";

  
  
  const useStyle = makeStyles({
  
    stuListColor:{
      backgroundColor: orange[400],
      color: "white",
    },
    tableHeadCell:{
       color: 'white',
       fontWeight:'bold',
       fontSize: 16, 
    },
  });

const List = () => {
    const classes = useStyle();
    const [students, setStudents] = useState([]);
    useEffect(()=>{
      getAllStudents();
    },[])
    async function getAllStudents(){
      try{
        const students = await axios.get("http://localhost:3333/students");
        //  console.log(students.data);
        setStudents(students.data);
       
      } catch(error){
        console.log("Something is wrong")
      }
    }
    const handleDelete = async id => {
      await axios.delete(`http://localhost:3333/students/${id}`)
      var newStudent = students.filter((item) =>{
        console.log(item.id);
            return item.id !== id;
      })
      setStudents(newStudent);
    }
  return (
    <>
      <Grid item md={6} xs={12}>
            <Box textAlign="center" className={classes.stuListColor} mb={2} p={2}>
              <Typography variant="h4">Student List</Typography>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead >
                  <TableRow style={{backgroundColor: '#616161'}}>
                   <TableCell className={classes.tableHeadCell} align="center" >No.</TableCell>
                    <TableCell className={classes.tableHeadCell} align="center" >Name</TableCell>
                    <TableCell className={classes.tableHeadCell} align="center" >Email</TableCell>
                    <TableCell className={classes.tableHeadCell} align="center" >Action</TableCell>
                  </TableRow> 
                </TableHead>
                <TableBody>
                  {
                    students.map((student,i) => {
                      return(
                        <TableRow key={i}>
                        <TableCell align="center" >{i+1}</TableCell>
                        <TableCell align="center" >{student.stuname}</TableCell>
                        <TableCell align="center" >{student.email}</TableCell>
                        <TableCell align="center" >
                          <Tooltip title="view">
                            <IconButton> <Link to={`/view/${student.id}`}><VisibilityIcon color="primary"/></Link ></IconButton>
                          </Tooltip>
                          <Tooltip title="edit">
                            <IconButton>  <Link to={`/edit/${student.id}`}> <EditIcon /> </Link> </IconButton>
                          </Tooltip>
                          <Tooltip title="delete">
                            <IconButton onClick={e => handleDelete(student.id)}> <DeleteIcon color="secondary" /></IconButton>
                          </Tooltip>
                        </TableCell>
                    </TableRow>
                      )
                    })
                  }
                      
                  
               </TableBody>
              </Table>
            </TableContainer>
          </Grid>
    </>
  )
}

export default List