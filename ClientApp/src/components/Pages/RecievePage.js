import React, { Component } from 'react';
import { Button} from 'reactstrap';
import axios from 'axios';

export class RecievePage extends Component {
    constructor(props) {


        super(props);

        this.state = {
            items: [],
            message: "",
            messageArray: [],
            iterations: 0, //controllo per la scritta no messages in queue
        };

        this.TakeMessage = this.TakeMessage.bind(this);

        this.GoToSendPage = this.GoToSendPage.bind(this);

        this.MyTimer = this.MyTimer.bind(this);

        this.LogOut = this.LogOut.bind(this);
    }

    //set a timer used to call the read-message function every second

    MyTimer() {

        var time = new Date();

        var seconds = time.getSeconds();

        this.setState({ seconds: seconds });

    }

    // handle the queued messages

    async TakeMessage() {

        let message = await axios.get("api/Rabbit/GetMessage");

        if (message === null) {
            //
        }
        else {

            this.setState(state => ({ messageArray: state.messageArray.concat(message.data) }));
        }
    }

    //every second, the takeMessage function is called

    componentDidMount() {
        this._interval = setInterval(() => {
            this.TakeMessage()
        }, 1000);
    }

    //when unmounting the page, the timer is cleared

    componentWillUnmount() {

        clearInterval(this._interval);
    }

    GoToSendPage() {

        this.props.history.push("/SendPage");
    }

    //handle log out

    async LogOut() {

        await axios.delete("api/Rabbit/AbortConnection");

        this.props.history.push("/");
    }



    render() {

        
            const items = [];
            let i = 0;
                for (let mess of this.state.messageArray)
                { 

                    items.push(
                        <h1 key={i} >
                            {mess}
                        </h1>)
                    i++;
                }

        

       
       

        return (
            <div>
                <h1>Messages: </h1>
                {items}
                <br></br>
                <br></br>
                <Button color="secondary" onClick={this.GoToSendPage} >Send messages</Button>
                <br></br>
                <br></br>
                <br></br>
                <Button variant="secondary" size="lg" block onClick={this.LogOut}>Logout</Button>

            </div>
        );
     }
}
