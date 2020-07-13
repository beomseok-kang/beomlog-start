import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({ onChange }) {
    return (
        <CKEditor
            editor={ ClassicEditor }
            data=""
            onChange={onChange}
        />
    );
}

export default Editor;