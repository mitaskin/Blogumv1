import React, { useEffect, useState, useGlobal } from "reactn";
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { Row, Col, Form, Input, Button, Switch, DatePicker, Card, message, Select, Alert } from 'antd';
import { LeftOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useCallback } from "react";
import axios from 'axios'

const { Option } = Select;

const BlogDetail = (props) => {
    let params = useParams()
    let id = params.id !== "add" ? params.id : false;
    let settings = useGlobal("settings")[0]
    let profileSettings;
    let [langs] = useGlobal("langs");
    let [languagesCms] = useGlobal("languagesCms");

    if (settings) {
        settings.forEach(element => {
            if (element._id === "profileSettings") {
                profileSettings = element
            }
        });
    }

    let newRecord = {
        title: '',
        tag: '',
        text: ''
    }

    let [data, setData] = useState(id ? [] : newRecord);
    let [loading, setLoading] = useState(id ? true : false);
    let [isSmall, setIsSmall] = useGlobal('isSmall')
    //onetime run
    useEffect(() => {
        if (id) {
            setLoading(true)
            axios.get(`http://localhost:5000/api/blogs/` + id).then(({ data: { result, result_message } }) => {
                console.log(result)
                setData(result)
                setLoading(false)
            });
        }
    }, [id]);

    let save = async () => {
        if (id) {
            axios.put(`http://localhost:5000/api/blogs/` + id, data).then(({ data: { result, result_message } }) => {
                console.log(result)
            })
        } else {
            axios.post("http://localhost:5000/api/blogs", data).then(({ data: { result, result_message } }) => {
                console.log(result)
            })
        }
    };
    return (
        <div>
            <div className="list-head">
                <div className="list-title">
                    <h1>{id ? "Blog Detay" : "Blog Ekle"}</h1>
                </div>
                <div className="list-buttons">
                    <Link to="/blogs">
                        <Button type="light" icon={<LeftOutlined />} size={'large'}>Geri</Button>
                    </Link>
                </div>
            </div>
            <div className="form-wrap">
                <Card title={id ? "Blog Düzenle" : "Blog Ekle"} loading={loading}>
                    <Form layout="horizontal" size={"large"} onFinish={save}>
                        <Row direction="row">
                            <Col span={24}>
                                <Form.Item label="Title">
                                    <Input name="title" value={data.title}
                                        onChange={e => setData({ ...data, title: e.target.value })} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Tag">
                                    <Input name="tag" value={data.tag}
                                        onChange={e => setData({ ...data, tag: e.target.value })} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row direction="row">
                            <Col span={24}>
                                <Form.Item label="Text">
                                    <Input name="text" value={data.text}
                                        onChange={e => setData({ ...data, text: e.target.value })} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row direction="row">
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" disabled={loading} htmlType="submit" size="large" block> Kaydet </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
    );
};
export default BlogDetail;
