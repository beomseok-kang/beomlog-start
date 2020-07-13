import React, { useState } from 'react';
import Editor from '../../Components/WritingPage/Editor';
import './EditorContainer.scss';

function EditorContainer() {

    const [value, setValue] = useState('');

    const onChange = (event: any, editor: any) => {
        setValue(editor.getData());
    }

    const onClick = () => {
        console.log(value);
    }

    return (
        <>
            <div className="editor-container">
                <Editor onChange={onChange}/>
                <button onClick={onClick}>Submit</button>
            </div>
        </>
    );
}

export default EditorContainer;