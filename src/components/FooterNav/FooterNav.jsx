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



import DialogActions from '@mui/material/DialogActions';

import Alert from '@mui/material/Alert';
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
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from '@mui/material'; 

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const FooterPage = () => {
  const [html, sethtml] = useState('');
  const [file, setselectefile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // Confirmation dialog state
  // const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    contenttype: '',
    external_link: '',
    internale_link: '',
    file: '',
    html: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      tittle_name: '',
      contenttype: '',
      external_link: '',
      internale_link: '',
      file: '',
      html: '',
    });
  }, []);

  const handleEditorChange = (content) => {
    sethtml(content);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.tittle_name) {
      errors.tittle_name = 'Name is required';
    }

    if (!formData.contenttype) {
      errors.contenttype = 'Select a content type';
    }

    if (formData.contenttype === '4' && !formData.external_link) {
      errors.external_link = 'External Link is required';
    }

    if (formData.contenttype === '3' && !formData.internale_link) {
      errors.internale_link = 'Internal Link is required';
    }

    if (formData.contenttype === '2' && !file) {
      errors.file = 'File is required';
    }

    if (formData.contenttype === '1' && !html) {
      errors.editorContent = 'HTML content is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setselectefile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === '2') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenConfirmation = () => {
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('tittle_name', formData.tittle_name);
      formDataToSend.append('contenttype', formData.contenttype);

      if (formData.contenttype === '4') {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.contenttype === '3') {
        formDataToSend.append('internale_link', formData.internale_link);
      } else if (formData.contenttype === '2') {
        formDataToSend.append('file', file);
      } else if (formData.contenttype === '1') {
        formDataToSend.append('html_content', html);
      }

      const response = await apiClient.post(apis.newfooter, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true); // Show the success Snackbar
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const config = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
  };
  console.log(formData)

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="col text-end">
            <Link to="/footer/footertable" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary">
                <ViewListIcon /> Data view
              </button>
            </Link>
          </div>
          <h1 className="text-center">Footer</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Input for Name */}
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && <div className="text-danger">{errors.tittle_name}</div>}
          </div>

          {/* Input for Select a content type */}
          <div className="mb-3">
            <label className="form-label text-dark">Select a content type</label>
            <select
              className="form-select"
              name="contenttype"
              value={formData.contenttype}
              onChange={handleInputChange}
            >
              <option value="">Select a content type</option>
              <option value="4">External Link</option>
              <option value="3">Internal Link</option>
              <option value="2">File</option>
              <option value="1">HTML</option>
            </select>
            {errors.contenttype && <div className="text-danger">{errors.contenttype}</div>}
          </div>

          {/* Input for External Link */}
          {formData.contenttype === '4' && (
            <div className="mb-3">
              <label className="form-label text-dark">Enter External Link</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter External Link"
                name="external_link"
                value={formData.external_link}
                onChange={handleInputChange}
              />
              {errors.external_link && <div className="text-danger">{errors.external_link}</div>}
            </div>
          )}

          {/* Input for Internal Link */}
          {formData.contenttype === '3' && (
            <div className="mb-3">
              <label className="form-label text-dark">Enter Internal Link</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Internal Link"
                name="internale_link"
                value={formData.internale_link}
                onChange={handleInputChange}
              />
              {errors.internale_link && <div className="text-danger">{errors.internale_link}</div>}
            </div>
          )}

          {/* Input for File */}
          {formData.contenttype === '2' && (
            <div className="mb-3">
              <label className="form-label text-dark">Choose File</label>
              <input
                className="form-control"
                type="file"
                name="file"
                onChange={handleImageChange}
              />
              {errors.file && <div className="text-danger">{errors.file}</div>}
            </div>
          )}

          {/* HTML Editor Input */}
          {formData.contenttype === '1' && (
            <div className="mb-3">
              <label className="form-label text-dark">HTML Editor</label>
              <div>
                <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea>
              </div>
              {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
            </div>
          )}

          {/* Submit Button */}
          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleOpenConfirmation}>
              Submit
            </button>
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
              autoHideDuration={3000} // Adjust as needed
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                {modalMessage}
              </Alert>
            </Snackbar>
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust as needed
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Data deleted successfully.
        </Alert>
      </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};
