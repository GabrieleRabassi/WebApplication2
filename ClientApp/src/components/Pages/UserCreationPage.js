import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


export class UserCreationPage extends Component {
    constructor(props) {

        super(props);
        this.state = {
            Password: "",
            UserName: "",
        };

        this.HandlePasswordChange = this.HandlePasswordChange.bind(this);

        this.HandleUserNameChange = this.HandleUserNameChange.bind(this);

        this.CreateNewUser = this.CreateNewUser.bind(this);

        this.GoToLoginPage = this.GoToLoginPage.bind(this);

        this.CreateQueue = this.CreateQueue.bind(this);

        this.SetPermission = this.SetPermission.bind(this);

        this.SetTopicPermissions = this.SetTopicPermissions.bind(this);

        this.CreateQueue = this.CreateQueue.bind(this);

        this.SetBinding = this.SetBinding.bind(this);
    }

    HandleUserNameChange(event) {
        this.setState({ UserName: event.target.value });
    }

    HandlePasswordChange(event) {
        this.setState({ Password: event.target.value });
    }

    //handle the user creations

    async CreateNewUser() {
        let config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='  //gives basic authorizations that allows you to create and modificate users
            },
        };
        let NewUserData = {
            password: this.state.Password,
            tags: "administrator",

        }

        let urlNewUser = "http://localhost:15672/api/users/" + this.state.UserName;

        await axios.put(urlNewUser, NewUserData, config);  

        this.SetPermission();

        this.SetTopicPermissions();
        
        this.CreateQueue();

        this.GoToLoginPage();
    }

    //handle the queue creation related with the user

    async CreateQueue() {
        let config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
            },
        };
        let QueueSettings = {
            "auto_delete": false,
            "durable": true,
            "arguments": {},
            "node": "rabbit@DESKTOP-PB778CJ"
        }

        console.log(QueueSettings);
        let urlNewQueue = "http://localhost:15672/api/queues/VHProva/" + this.state.UserName;
        await axios.put(urlNewQueue, QueueSettings, config); //creazione coda
        this.SetBinding();
    }

    //set the topic-permissions for the users

    async SetTopicPermissions() {

        let setTopicPermsBody = {
            "exchange": "AMPQ default",
            "write": ".*",
            "read": ".*"
        }

        let config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
            },
        };

        let urlSetNewTopicPerms = "http://localhost:15672/api/topic-permissions/VHProva/" + this.state.UserName;
        await axios.put(urlSetNewTopicPerms, setTopicPermsBody, config); //definizione dei permessi di topic (??)

    }

    //set the read/write permissions

    async SetPermission() {

        let setPermissionsBody = {

            "configure": ".*",
            "write": ".*",
            "read": ".*"
        }
        let config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
            },
        };

        let urlSetPermissions = "http://localhost:15672/api/permissions/VHProva/" + this.state.UserName;
        await axios.put(urlSetPermissions, setPermissionsBody, config); //definizione dei permessi di lettura scrittura

    }

    //set the queue binding

    async SetBinding() {

        let config = {
            headers: {
                'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q='
            },
        };
        let routingKey = this.state.UserName + "_key";
        let BindingBody = {
            "routing_key": routingKey,
            "arguments": { "x-arg": "value" } //??
        }
        let urlNewBinding = "http://localhost:15672/api/bindings/VHProva/e/gruppo/q/" + this.state.UserName;
        await axios.post(urlNewBinding, BindingBody, config);  //definizione del binding
    }

    GoToLoginPage() {
        this.props.history.push("/LoginPage");
    }




    render() {
        return (
            <div>
                <Form>

                    <FormGroup row>
                        <Label sm={2}>UserName</Label>
                        <Col sm={10}>
                            <Input placeholder="UserName" value={this.state.UserName} onChange={this.HandleUserNameChange} />
                        </Col>
                    </FormGroup>


                    <FormGroup row>
                        <Label sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input placeholder="Password" value={this.state.Password} onChange={this.HandlePasswordChange} />
                        </Col>
                    </FormGroup>
         
                </Form>
                <Button color="secondary" onClick={this.CreateNewUser} >Register</Button>

                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <Button color="secondary" onClick={this.ReturnLoginPage} >Login</Button>
            </div>
        );
    }
}