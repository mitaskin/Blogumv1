import React, { useEffect, useState, useGlobal } from "reactn";
import { Table, Space, Button, Input, Popconfirm } from 'antd';
import moment from 'moment';
// import api from '../service/index'
import axios from 'axios'
import { Link } from 'react-router-dom';
import qs from 'qs';

import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    CheckOutlined,
    CloseOutlined,
    DownloadOutlined,
    Loading3QuartersOutlined,
    CommentOutlined
} from "@ant-design/icons";

const Blogs = (props) => {
    const { Search } = Input;

    let [data, setData] = useState([]);
    let [loading, setLoading] = useState(false)
    let [search, setSearch] = useState(false)

    let get = async () => {
        await axios.get(`http://localhost:5000/api/blogs`)
            .then(res => {
                console.log(res.data.result)
                setData(res.data.result)
                setLoading(false)
            })
    }

    useEffect(() => {

        setLoading(true)
        get();

    }, [])

    useEffect(() => {
        get();
    }, [search]);

    let onChange = async (e) => {
        setSearch(e.target.value);
        get();
    }

    let deleteRow = async (item_id) => {
        axios.delete(`http://localhost:5000/api/blogs/`+item_id, ({ data }) => { });
        let newData = data.filter(el => el._id !== item_id);
        setData(newData);    
    }

    let columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title - b.titlw,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            sorter: (a, b) => a.tag - b.tag,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
            sorter: (a, b) => a.text - b.text,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Action',
            key: 'action',
            className: 'editColumn',
            width: 150,
            render: (text, record) => (
                <Space size="small">
                    <Link to={"/blogs/edit/" + record._id}>
                        <Button icon={<EditOutlined />}>Düzenle</Button>
                    </Link>
                    <Popconfirm
                        onConfirm={() => deleteRow(record._id)} title="Silmek istediğinize emin misniz?"
                        okText="Sil" cancelText="Vazgeç">
                        <Button type="danger" icon={<DeleteOutlined />}>Sil</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="list-head">
                <div className="list-title">
                    <h1>Blog Listesi</h1>
                </div>
                <div className="list-buttons">
                    <Link to="/blogs/add">
                        <Button type="light" icon={<PlusOutlined />} size="large">Yeni Ekle</Button>
                    </Link>
                </div>
            </div>

            <div className="table-wrap">
                <Table dataSource={data} columns={columns}
                    loading={{ spinning: loading, indicator: <Loading3QuartersOutlined spin />, size: "large" }}
                />
            </div>

        </div>
    );
};


export default Blogs;
