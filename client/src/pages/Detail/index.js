import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    };
  }
  onChange=(newValue, e) => {
    console.log('onChange', newValue, e);
  }
  editorDidMount=(editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <CodeMirror 
        options={{
        mode: 'javascript',
      }}
      />
    );
  }
}

Detail.propTypes = {

};

export default Detail;
