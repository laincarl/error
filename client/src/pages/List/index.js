import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'Axios';
import { Table, Divider, Tag, Popover } from 'antd';
import Code from './components/Code';

class List extends Component {
  state = {
    data: [],
  }
  componentDidMount() {
    axios.get('/list').then((data) => {
      this.setState({
        data,
      });
      console.log(data);
    });
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        title: 'category',
        dataIndex: 'category',
        key: 'category',
        render: category => (
          category
        ),
      },
      {
        title: 'msg',
        dataIndex: 'msg',
        key: 'msg',
        render: msg => (
          <Popover content={<div style={{ whiteSpace: 'pre-wrap' }}>{msg}</div>}>
            <div style={{
          width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}
            >{msg}</div>
          </Popover>
        ),
      },
      {
        title: 'source',
        dataIndex: 'source',
        key: 'source',
      },
    ];

    return (
      <div>
        list
        <Table
          pagination={false}
          columns={columns}
          dataSource={data} 
          expandedRowRender={record => (
            <Code
              errorLines={[record.row]}
              value={record.file}
            />)} 
        />
      </div>
    );
  }
}

List.propTypes = {

};

export default List;
