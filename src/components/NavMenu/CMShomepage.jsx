import React ,{useState,useEffect}from 'react'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
// import CKEditor from '@ckeditor/ckeditor5-react';
import { CKEditor } from 'ckeditor4-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/en-gb.css';

export const CMShomepage = () => {
	const [ events, setEvents ] = useState( [] );

	const logEvent = ( evt ) => {
		evt.timestamp = new Intl.DateTimeFormat( 'en', {
			hour12: false,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		} ).format( new Date() );

		setEvents( events =>  [ evt, ...events ] );
	}

	const clearEvents = () => {
		setEvents( [] );
	}
  return (
    <div>
        <h1>Home Page</h1>
        <div className="App">
            <h2>Using CKEditor 4 in React</h2>
            {/* <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onInit={(editor) => {
          // You can customize the editor here
          // editor.ui.view.editable.element.style.height = '300px';
        }}
        onChange={handleEditorChange}
      /> */}
      <CKEditor
		type="inline"
		initData={<p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>}
	/>,
        </div>
    </div>
  )
}