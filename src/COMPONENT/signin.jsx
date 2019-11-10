import React from 'react';
import Button from '@material-ui/core/Button';

import AuthHelperMethods from '../../Auth/Auth';
import axios from 'axios';
import { Form } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { withRouter } from 'react-router-dom';
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
class SimpleFormExample extends React.Component {
    state = {
        formData: {
            email: '',
            password: '',
        }

    }
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }
    handleSubmit = async () => {
        try {
            const { formData } = this.state;
            let result = await axios.post('http://localhost:4500//drive/user/login', {
                email: formData.email,
                password: formData.password
            })
            const Auth = new AuthHelperMethods();
            Auth.setToken(result.data);
            const acc_type = Auth.getConfirm();
            console.log(acc_type);
            
            this.props.history.push(`/${acc_type.account_type}`);
        } catch (error) {

        }


    }

    render() {


        return (
          <React.Fragment>
            
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className="paper">
                <Avatar className="avatar">
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Form className="form" onSubmit={this.handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handlechange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handlechange}
                  />
    
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                  >
                    Sign In
                  </Button>
                 
                 
                </Form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </React.Fragment>
        )  
  }
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Ahmad Anis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default withRouter(SimpleFormExample);