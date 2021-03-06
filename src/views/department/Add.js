import React, { Component } from "react";
//antd
import { Form,Input,Button,InputNumber, Radio, message } from 'antd'
//API
import {DepartmentApi,Detailed,Edit} from '../../api/department'

class DepartmentAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            fromLayout:{
                labelCol:{span:3,},
                wrapperCol:{span:18},
            },
            id:'',
        };
    }
    componentWillMount=()=>{
        if(this.props.location.state){
            this.setState({
                id:this.props.location.state.id
            })
        }
       
    }
    componentDidMount=()=>{
        this.getDetailed()
    }
    getDetailed=()=>{
        console.log(this.state.id)
        if(!this.props.location.state){return false}
        Detailed({id:this.state.id}).then(res=>{
            let data =  res.data.data
            // this.refs.form.setFieldsValue(res.data.data)
            this.refs.form.setFieldsValue({
                content:data.content,
                number:data.number,
                status:data.status,
                name:data.name,
            })

        })
    }
    onSubmit=(value)=>{
        if(!value.name){
            return message.error("部门名称不能为空!")
        }
        if(!value.number){
            return message.error("人员数量不能为0!")
        }
        if(!value.content){
            return message.error("描述内容不能为空!")
        }
        this.setState({
            loading:true
        })
       this.state.id?this.onHandleEdit(value):this.onHandleAdd(value)
    }
    /**添加信息 */
    onHandleAdd=(value)=>{
        DepartmentApi(value).then(res=>{
            const data = res.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            //重置表单
            this.refs['form'].resetFields()
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
    }
    /**编辑信息 */
    onHandleEdit=(value)=>{
        const requestData = value
        requestData.id = this.state.id
        Edit(requestData).then(res=>{
            const data = res.data
            message.info(data.message)
            this.setState({
                loading:false
            })
            //重置表单
            this.refs['form'].resetFields()
        }).catch(err=>{
            this.setState({
                loading:false
            })
        })
    }
    render(){
        return (
            <Form ref="form"  onFinish = {this.onSubmit} initialValues={{status:true,number:0}} {...this.state.fromLayout} >
            <Form.Item label="部门名称" name="name">
                <Input type='text' autoComplete='off' allowClear />
            </Form.Item>
            <Form.Item label="人员数量" name="number">
               <InputNumber  min={0} max={100} />
           </Form.Item>
           <Form.Item label="禁止启用" name="status">
                <Radio.Group>
                    <Radio value={false}>禁用</Radio>
                    <Radio value={true}>启用</Radio>
                </Radio.Group>
           </Form.Item>
           <Form.Item label="描述" name="content">
               <Input.TextArea allowClear />
           </Form.Item>
           <Form.Item >
               <Button loading={this.state.loading} type='primary' htmlType='submit'>确定</Button>
           </Form.Item>

           </Form>
        )
    }
}
export default DepartmentAdd;