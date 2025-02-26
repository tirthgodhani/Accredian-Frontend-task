import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import { createReferral } from '../services/api';

const courses = [
  { id: 'COURSE1', name: 'Web Development Bootcamp' },
  { id: 'COURSE2', name: 'Data Science Fundamentals' },
  { id: 'COURSE3', name: 'Mobile App Development' },
];

const ReferralModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerEmail: '',
    refereeName: '',
    refereeEmail: '',
    courseId: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await createReferral(formData);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          referrerName: '',
          referrerEmail: '',
          refereeName: '',
          refereeEmail: '',
          courseId: '',
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Refer a Friend</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Referral sent successfully!
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Your Name"
              name="referrerName"
              value={formData.referrerName}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <TextField
              label="Your Email"
              name="referrerEmail"
              type="email"
              value={formData.referrerEmail}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <TextField
              label="Friend's Name"
              name="refereeName"
              value={formData.refereeName}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <TextField
              label="Friend's Email"
              name="refereeEmail"
              type="email"
              value={formData.refereeEmail}
              onChange={handleChange}
              required
              fullWidth
            />
            
            <TextField
              select
              label="Select Course"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              required
              fullWidth
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Sending...' : 'Send Referral'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ReferralModal;
