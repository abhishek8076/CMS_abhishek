import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import apiClient from '../../services/AxiosApi';
import apis from '../../utils/apiUrl.json';
import MyEditor, { HtmlEditor } from '../htmlEditor/htmlEditor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './indexFooter.scss';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material';



export const FooterDesc = () => {
  const [html, sethtml] = useState('');
  const [file, setselectedfile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    description: '',
    footertype:1,
    contenttype:0
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      tittle_name: '',
      description: '',
      footertype:1,
      contenttype:0
    });
  }, []);

 
    const validateForm = () => {
      const errors = {};
  
      // Regular expression to match names with alphabets and spaces
      const namePattern = /^[a-zA-Z\s]+$/;
  
      if (!formData.tittle_name) {
        errors.tittle_name = 'Name is required';
      } else if (!formData.tittle_name.match(namePattern)) {
        errors.tittle_name = 'Name should only contain alphabets and spaces';
      }
  
      if (!formData.description) {
        errors.description = 'Description is required';
      }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };


  const handleInputChange = (event) => {
    const { name, value} = event.target;

  
    
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };

  const handleOpenConfirmation = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('tittle_name', formData.tittle_name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('footertype', formData.footertype);
      formDataToSend.append('contenttype', formData.contenttype);

      const response = await apiClient.post(apis.newfooter, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);

      // Clear the form fields
      setFormData({
        tittle_name: '',
        description: '',
       
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  console.log(formData)

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
            <Link to="/footer/footertable" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary">
                <ViewListIcon /> Data view
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="main-body"> */}
      <div className="row justify-content-center">
        <div className="col-md-6">
<div className="box-sec">
        <div className="mb-3">
        <h1 className="text-center heading-main">Footer Description</h1>
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && (
              <div className="text-danger">{errors.tittle_name}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label text-dark">Description</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            {errors.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
          <div className="btnsubmit">
            <button
              className="btn btn-primary"
              onClick={handleOpenConfirmation}
            >
              Submit
            </button>
            <Link to="/dashboard" className="link">
            <Button id="btn" variant="contained">
            <HomeIcon /> Back
            </Button>
          </Link>
            <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmation}>
              <DialogTitle>Confirm Submit</DialogTitle>
              <DialogContent>
                Are you sure you want to submit this data?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseConfirmation} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleConfirmSubmit} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {modalMessage}
              </Alert>
            </Snackbar>
          </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
