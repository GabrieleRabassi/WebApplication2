import axios from 'axios';
import React, { Component } from 'react';
import { Button, Container, Jumbotron } from 'reactstrap';

export class ChoicePage extends Component {

    //attributes initialization

    constructor(props) {

        super(props);
        this.state = {};

        this.SendKeyPressed = this.SendKeyPressed.bind(this);
        this.SendKeyPressed = this.SendKeyPressed.bind(this);
        this.GoToSend = this.GoToSend.bind(this);
        this.RecieveKeyPressed = this.RecieveKeyPressed.bind(this);
        this.GoToRecieve = this.GoToRecieve.bind(this);
        this.LogOut = this.LogOut.bind(this);
    }

    //handle the user's choice 

    RecieveKeyPressed()
    {
        this.GoToRecieve();
    }

    SendKeyPressed()
    {
        this.GoToSend();
    }

    GoToRecieve()
    {
        this.props.history.push("/RecievePage");
    }
  
    GoToSend()
    {
        this.props.history.push("/SendPage");
    }

 //ciao gabrielle

    async LogOut() {
        await axios.delete("api/Rabbit/AbortConnection");
        this.props.history.push("/");
    }



  //handle the page layout 

    render() {
        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Welcome to RabbitMQ portal</h1>
                        <p className="lead">Here you can decide to send or recieve messages from other users.</p>
                    </Container>
                </Jumbotron>
              
                
                
                    <Button variant="primary" size="lg" block onClick={this.SendKeyPressed}>Send</Button>
                <Button variant="secondary" size="lg" block onClick={this.RecieveKeyPressed}>Receive</Button>
                <Button variant="secondary" size="lg" block onClick={this.LogOut}>Logout</Button>


            </div>
        );
    }
}
   

