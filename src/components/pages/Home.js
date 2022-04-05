import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { deepPurple, green} from "@mui/material/colors";
import List from "../student/List";
import axios from "axios";
import { useState } from "react";



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

export const Home = () => {
  const classes = useStyle();

  const [student,setStudent] = useState({
    stuname:"",
    email:""
  });

const [status,setStatus] = useState();
  
  function onTextFieldChange (e){
    setStudent({
      ...student,
      [e.target.name] : e.target.value
    })
  }

  async function onFormSubmit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:3333/students",student)
      setStatus(true);
    }catch(error){
      console.log("Something went wrong");
    }
  }
  
  if(status){
    return <Home/>
  }

  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h3">React CRUD with API call</Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" className={classes.addStuColor} p={2} mb={2}>
            <Typography variant="h4">Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="stuname" name="stuname" id="name" label="Name" variant="outlined" required fullWidth onChange={e => onTextFieldChange(e)} />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" name="email" id="email" label="Email" variant="outlined" required fullWidth onChange={e => onTextFieldChange(e)} />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)} >Add</Button>
            </Box>
          </form>
        </Grid>
        <List/>
      </Grid>
    </>
  );
};
