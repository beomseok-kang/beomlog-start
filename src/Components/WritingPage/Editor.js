import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor({ onChange, data }) {
    return (
        <CKEditor
            editor={ ClassicEditor }
            data={data}
            onChange={onChange}
        />
    );
}

Editor.defaultProps = {
    data: ""
};

export default Editor;