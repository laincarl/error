import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'codemirror/lib/codemirror.css';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import './Code.scss';

class Code extends Component {
  componentDidMount() {
    this.handleError();
  }
  
  handleError =() => {
    const { value, errorLines, change } = this.props;
    if (this.aceEditor) {
      const editor = this.aceEditor.getCodeMirror();
      errorLines.forEach((line) => {
        editor.addLineClass(line - 1, 'wrap', 'line_error');
        editor.addLineClass(line - 1, 'gutter', 'gutter_error');
      });
    }
    const errorLineElement = document.getElementsByClassName('line_error')[0];
    if (errorLineElement) {
      errorLineElement.scrollIntoView();
    }   
  };
  render() { 
    return (
      <CodeMirror
        ref={(instance) => { this.aceEditor = instance; }} // Let's put things into scope
        options={{
        mode: 'javascript',
        lineNumbers: true,
        lineWrapping: true,
        styleActiveLine: true,
        styleActiveSelected: true,
      }}
        {...this.props}
      />
    );
  }
}

Code.propTypes = {

};

export default Code;
