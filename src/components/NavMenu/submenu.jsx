import React, { useState, useEffect,useMemo,useCallback } from 'react';
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
import { Col, Form, Row } from 'react-bootstrap';
import { ElectricBike } from '@mui/icons-material';
import JoditEditor from 'jodit-react';

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

export const Submenu = () => {
  const [html, setHtml] = useState('');
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [data, Setdata] = useState([])
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedRole1, setSelectedRole1] = useState('');
  const [content, setContent] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    MenuName: '',
    ContentType: '',
    external_link: '',
    internal_link: '',
  
    submenu_id: "",
    file: '',
    html: '',
    
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      MenuName: '',
      ContentType: '',
      external_link: '',
      internal_link: '',
      submenu_id: "",
      file: '',
      html: '',
    
    });
  }, []);
  

  const config = useMemo(
    () => ({
      readonly: false
    }),
    []
  );
  
  const onChange = useCallback((newContent) => {
    console.log("Editor content changed:", newContent);
    setContent(newContent);
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.MenuName) {
      newErrors.MenuName = 'Name is required';
    }
    // if (!formData.menu_id) {
    //   newErrors.MenuName = 'Name is required';
    // }


    if (!formData.ContentType) {
      newErrors.ContentType = 'Select a content type';
    }
    if (!selectedRole) {
      newErrors.ContentType = 'Select Menu';
    }

    if (formData.ContentType === '4' && !formData.external_link) {
      newErrors.external_link = 'External Link is required';
    }

    if (formData.ContentType === '3' && !formData.internal_link) {
      newErrors.internal_link = 'Internal Link is required';
    }

    if (formData.ContentType === '2' && !file) {
      newErrors.file = 'File is required';
    }

    // if (formData.ContentType === '1' && !html) {
    //   newErrors.html = 'HTML content is required';
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };

  const handleInputChange = (event) => {
    setSelectedRole(event.target.value);
    setSelectedRole1(event.target.value);
    const { name, value, type } = event.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setSelectedRole(event.target.value);
      setSelectedRole(event.target.value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      formDataToSend.append('MenuName', formData.MenuName);
      formDataToSend.append('ContentType', formData.ContentType);
   
      // formDataToSend.append('submenu_id', formData.submenu_id);
      formDataToSend.append('submenu_id', formData.submenu_id);

      if (formData.ContentType === '4') {
        formDataToSend.append('external_link', formData.external_link);
      } else if (formData.ContentType === '3') {
        formDataToSend.append('internal_link', formData.internal_link);
      } else if (formData.ContentType === '2') {
        formDataToSend.append('file', file);
      } else if (formData.ContentType === '1') {
        formDataToSend.append('html', content);
      }

      const response = await apiClient.post(apis.navmenu, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data saved:', response.data);
      toast.success('Data saved successfully!');
      setModalMessage('Data saved successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await apiClient.get(apis.getmenuname);
        Setdata(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);
  // useEffect(() => {
  //    const fetchData1= async()=> {
  //     try {
  //       setLoading(true);
  //       const response = await apiClient.get(apis.getmenuname);
  //       setDropdownOptions(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setLoading(false);
  //     }
  //   }
  //   fetchData1();
  // }, []);

  console.log(formData)

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div >
        <Row>
                <Col xs={12} className="text-end">
                <Link to='/cms/menutable' style={{textDecoration:'none'}}>
            <Button>
              Table
            </Button>
            </Link>
                </Col>
              </Row>
        <div class="box-sec">
        <h1 className="text-center">Sub Menu</h1>
          <Form.Group className="mb-3" controlId="Usertype">
            <div className="mb-12">
              <Form.Label className="text-center" style={{ color: "black" }}>Menu Names</Form.Label>
              <select
                className='form-control'
                name='submenu_id'
                value={formData.submenu_id}
                onChange={handleInputChange}

              >
                <option value='' style={{ color: "black" }}>Select a Menu</option>
                {data.map((data) => (
                  <option key={data.u_id} value={data.u_id}>
                    {data.u_menu_name}
                  </option>
                ))}
              </select>
              <Form.Control.Feedback type="invalid">
                {/* {formErrors.usertype} */}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          {errors.selectedRole && <div className="text-danger">{errors.selectedRole}</div>}

          {/* Input for Name */}
          <div className="mb-3">
            <label className="form-label text-dark">Name</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="MenuName"
              value={formData.MenuName}
              onChange={handleInputChange}
              maxLength={18}
            />
            {errors.MenuName && <div className="text-danger">{errors.MenuName}</div>}
          </div>

          {/* Input for Select a content type */}
          <div className="mb-3">
            <label className="form-label text-dark">Select a content type</label>
            <select
              className="form-select"
              name="ContentType"
              value={formData.ContentType}
              onChange={handleInputChange}
            >
              <option value="">Select a content type</option>
              <option value="4">External Link</option>
              <option value="3">Internal Link</option>
              <option value="2">File</option>
              <option value="1">HTML</option>
            </select>
            {errors.ContentType && <div className="text-danger">{errors.ContentType}</div>}
          </div>

          {/* Input for External Link */}
          {formData.ContentType === '4' && (
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
          {formData.ContentType === '3' && (
            <div className="mb-3">
              <select
                                  className='form-control'
                                  name='internal_link'
                                  value={formData.internal_link}
                                  onChange={handleInputChange}
                                  isInvalid={!!formErrors.internal_link}
                                >
                                  <option value='' style={{color:"black"}}>Select a role</option>
                                  {data.map((data) => (
                                    <option key={data.u_id} value={"/menu/"+data.u_menu_url}>
                                      {"Menu Name"+":-"+data.u_menu_name}
                                    </option>
                                  ))}
                                </select>
              {errors.internal_link && <div className="text-danger">{errors.internal_link}</div>}
            </div>
          )}

          {/* Input for File */}
          {formData.ContentType === '2' && (
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
          {formData.ContentType === '1' && (
            <div className="mb-3">
              <label className="form-label text-dark">HTML Editor</label>
              <div>
                {/* <textarea
                  className="form-control"
                  value={html}
                  onChange={(e) => handleEditorChange(e.target.value)}
                ></textarea> */}
                <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onChange={onChange}
      />
              </div>
              {errors.editorContent && <div className="text-danger">{errors.editorContent}</div>}
            </div>
          )}

          {/* Submit Button */}
          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleOpenConfirmation}>
              Submit
            </button>
            <Row>
                <Col xs={12} className="text-end">
                  <Link to='/cms' style={{ textDecoration: 'none' }}>
                    <Button>
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
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
                Data save successfully.
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};
