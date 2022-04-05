import {
    Typography,
    Box,
    Grid,
    TextField,
    Button,
  } from "@mui/material";
  import { makeStyles } from "@mui/styles";
  import { deepPurple, green} from "@mui/material/colors";
  import axios from "axios";
  import { useParams, useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react"; 

const useStyle = makeStyles({
    headingColor: {
      backgroundColor: deepPurple[400],
      color: "white",
    },
    addStuColor: {
      backgroundColor: green[400],
      color: "white",
    },
  
  });
const Edit = () => {
    const classes = useStyle();
    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
      stuname:"",
      email:""
    });
    useEffect(()=>{
      getStudent();
    },[id])
    async function getStudent(){
      try{
        const student = await axios.get(`http://localhost:3333/students/${id}`)
        setStudent(student.data);
      }catch(error){
        console.log("Something went wrong");
      }
    }

    function onTextFieldChange(e){
      setStudent({
        ...student,
        [e.target.name] : e.target.value
      })
    }
    async function onFormSubmit(e){
      e.preventDefault();
      try{
       await axios.put(`http://localhost:3333/students/${id}`, student)
       handleClick();
      }catch(error){
        console.log("Something went wrong");
      }
    }
    function handleClick(){
      navigate("/");
    }
  return (
    <>
    <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h3">React CRUD with API call</Typography>
      </Box>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" className={classes.addStuColor} p={2} mb={2}>
            <Typography variant="h4">Edit Student</Typography>
          </Box>
          <form >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="id" name="id" id="id" label="ID" variant="outlined" value={id} disabled fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="stuname" name="stuname" id="name" label="Name" variant="outlined" value={student.stuname} required fullWidth onChange={e => onTextFieldChange(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email" id="email" label="Email" variant="outlined" value={student.email}required fullWidth onChange={e => onTextFieldChange(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Update</Button>
            </Box>
            <Box textAlign="center" m={3}>
              <Button type="button" variant="contained" color="primary" onClick={handleClick}>Back to home</Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default Edit