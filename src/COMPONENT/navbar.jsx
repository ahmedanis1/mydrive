import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AuthHelperMethods from '../Auth/Auth';
import { withRouter } from 'react-router-dom';

const styles = {
    root: {
        flexGrow: 1,
    },

};

function DenseAppBar(props) {
    const [showBtn, SetShowBtn] = useState(true)
    const [email, SetEmail] = useState('')

    useEffect(() => checkLogin(), []);
    function checkLogin() {
        const Auth = new AuthHelperMethods();
        if (!Auth.loggedIn()) {
            props.history.push('/');

            SetShowBtn(false);

        } else {
            const user_email = Auth.getConfirm();
            SetEmail(user_email.email);
        }

    }
    function logout() {
        localStorage.removeItem('id_token');
        checkLogin();
    }
    const { classes } = props;
    var btn = '', lab = '';
    if (showBtn) {

        btn = <Button onClick={logout} color="inherit">Logout</Button>;
        lab = <label style={{width:'190px',textOverflow: 'ellipsis', marginLeft: '50%', fontSize: '1.0rem', paddingTop: '7px', marginRight: '40px' }}>{email}</label>
    }
    return (
        <div className={classes.root}>
            <AppBar style={{ height: "85px", backgroundColor: '#0a0750' }} position="static">
                <Toolbar style={{ height: "85px" }} variant="dense">
                    <Typography variant="h6" color="inherit">
                        MY DRIVE
          </Typography>
                    {lab}
                    {btn}
                </Toolbar>
            </AppBar>
        </div>
    );
}

DenseAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(DenseAppBar));
