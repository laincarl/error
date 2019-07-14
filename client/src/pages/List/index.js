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
  renderExpand = (record) => {
    const { category } = record;
    switch (category) {
      case 'ajax': {
        const { request } = record;
        if (request) {
          const { method, body, url } = request;
          const requestBody = body ? JSON.parse(body) : {}
          const bodyRender = Object.keys(requestBody).map((key) => {
            return <div style={{ display: 'flex' }}>
              <span>{key}:</span>
              <span>{requestBody[key]}</span>
            </div>
          })

          const content = <div>
            <div style={{ display: 'flex' }}>
              <span>方法: </span>
              <span>{method}</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span>url: </span>
              <span>{url}</span>
            </div>
            请求体:
            {bodyRender}
          </div>
          return content;
        } else {
          return '空'
        }
      }
      case 'js': {
        const { file, row } = record;
        return file && <Code
          errorLines={[row]}
          value={file}
        />
      }
      default: return '空';
    }
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
        title: 'browser',
        dataIndex: 'browser',
        key: 'browser',
        render: browser => {
          const { fullVersion, name, os, version, } = browser;
          return <Popover content={
            <div>
              <div style={{ display: 'flex' }}>
                <span>浏览器:</span>
                <span>{name}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <span>版本:</span>
                <span>{fullVersion}</span>
              </div>
              <div>
                <div style={{ display: 'flex' }}>
                  <span>操作系统:</span>
                  <span>{os}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <span>版本:</span>
                  <span>{version}</span>
                </div>
              </div>
            </div>
          }>
            <div>{name}</div>
          </Popover>
        },
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
          expandedRowRender={this.renderExpand}
        />
      </div>
    );
  }
}

List.propTypes = {

};

export default List;
