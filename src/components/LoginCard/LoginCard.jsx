import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { Container, Paper, Tabs, Tab, Typography, TextField, Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    width: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  successMessage: {
    color: 'green',
    marginTop: theme.spacing(2),
  },
}));

export const LoginCard = () => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
    setUsername('');
    setPassword('');
    setEmail('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg('Login successful.');
      setUsername('');
      setPassword('');
      setEmail('');
      navigate('/');
    } catch (error) {
      setErrorMsg('Error logging in: ' + error.message);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMsg('Sign-up successful. Please log in.');
      setUsername('');
      setPassword('');
      setEmail('');
      setTabIndex(0);
    } catch (error) {
      setErrorMsg('Error signing up: ' + error.message);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setErrorMsg('Error sending password reset email: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {tabIndex === 0 ? 'Login' : 'Sign Up'}
        </Typography>
        <Tabs
          value={tabIndex}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          centered
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <form className={classes.form} onSubmit={tabIndex === 0 ? handleLogin : handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {tabIndex === 1 && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          )}
          {successMsg && (
            <Typography className={classes.successMessage}>{successMsg}</Typography>
          )}
          {errorMsg && (
            <Typography color="error">{errorMsg}</Typography>
          )}
          {tabIndex === 0 && (
            <Button onClick={handleResetPassword} color="primary">Forgot Password?</Button>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {tabIndex === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
