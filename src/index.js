import React, {Component} from 'react';
import { render } from 'react-dom';
import {EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import './App.css'



function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.imgur.com/3/image');
      xhr.setRequestHeader('Authorization', 'Client-ID c166b3ccc22b789');
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response)
        resolve(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error)
        reject(error);
      });
    }
  );
}


class EditorContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange: Function = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render(){
    const { editorState } = this.state;
    return <div className='editor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}    
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    </div>
  }
}






const App = () => (
  <div>
    <h2>React Editor App</h2>
    <EditorContainer />
  </div>
);

render(<App />, document.getElementById('root'));
