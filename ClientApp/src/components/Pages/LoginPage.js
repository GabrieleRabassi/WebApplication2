
import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';





export class LoginPage extends Component {

    //attributes initialization

    constructor(props) {

        super(props);
        this.state = { items: [], UserName: '', Password: '' };

        this.UserCreationPage = this.UserCreationPage.bind(this);
        this.HandleUserNameChange = this.HandleUserNameChange.bind(this);
        this.HandlePasswordChange = this.HandlePasswordChange.bind(this);
        this.CreateConnection = this.CreateConnection.bind(this);
        this.GoToSelectPage = this.GoToSelectPage.bind(this);
    }

    //sending user-name and password to backend

    async CreateConnection() {
        let LoginData = {
            UserName: this.state.UserName,
            Password: this.state.Password,
        }
        await axios.post("api/Rabbit/CreateConnection", LoginData)
        this.GoToSelectPage();
    }

    //  //when the button is clicked it moves you to the New Accaunt page
    UserCreationPage() {

        this.props.history.push("/UserCreationPage");

    }

    //when the button is clicked it moves you to the selection page 

    GoToSelectPage() {    
        
        this.props.history.push("/ChoicePage");
    }

    //handle the frontend input 

    HandleUserNameChange(event) {

        this.setState({ UserName: event.target.value });
    }

      //handle the frontend input 

    HandlePasswordChange(event) {

        this.setState({ Password: event.target.value });
    }



    //handle the layout of the page 

    render() {
        return (
            <div>
                <Form>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="email" name="email" id="exampleEmail" placeholder="UserName" value={this.state.UserName} onChange={this.HandleUserNameChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="examplePassword" placeholder="Password" value={this.state.Password} onChange={this.HandlePasswordChange} />
                        </Col>
                    </FormGroup>
                </Form>
                <Button color="secondary" onClick={this.CreateConnection} >Login</Button>
                <br></br>
                <br></br>
                <Button color="secondary" onClick={this.UserCreationPage} >Crea un account</Button>
            </div>
        );
    }
}