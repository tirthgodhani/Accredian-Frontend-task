import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  Divider
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  currentPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters'),
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

const Profile = () => {
  const [message, setMessage] = useState({ type: '', text: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/auth/profile`,
          {
            username: values.username,
            email: values.email,
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          const updatedUser = {
            ...user,
            username: values.username,
            email: values.email
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setMessage({ type: 'success', text: 'Profile updated successfully!' });
          setIsEditing(false);
        }
      } catch (error) {
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to update profile'
        });
      }
    }
  });

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '2.5rem'
              }}
            >
              {user.username?.[0]?.toUpperCase()}
            </Avatar>
            <Box sx={{ ml: 3 }}>
              <Typography variant="h4">{user.username}</Typography>
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  disabled={!isEditing}
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  disabled={!isEditing}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>

              {isEditing && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="currentPassword"
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                      helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="newPassword"
                      name="newPassword"
                      label="New Password"
                      type="password"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                      helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      label="Confirm New Password"
                      type="password"
                      value={formik.values.confirmNewPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                      helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={Boolean(message.text)}
        autoHideDuration={6000}
        onClose={() => setMessage({ type: '', text: '' })}
      >
        <Alert
          onClose={() => setMessage({ type: '', text: '' })}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
