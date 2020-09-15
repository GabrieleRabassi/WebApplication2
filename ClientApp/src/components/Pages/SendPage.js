import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import axios from 'axios';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export class SendPage extends Component {

    //attributes initialization

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            destinatario: "",
            body: "",
            dropdownOpen: false,
            usersArray: [],
            selectedUsername: "Users"
        };

        this.HandleBodyChange = this.HandleBodyChange.bind(this);
        this.SendMessage = this.SendMessage.bind(this);
        this.RecievePage = this.RecievePage.bind(this);
        this.LogOut = this.LogOut.bind(this);

    }

    //is called when the page is loading

    componentDidMount() {
        this.getUsers();
    }

    //create a struct Array which contain all the users with their propreties  

    RecievePage() {

        this.props.history.push("/RecievePage");
    }

    //get an array of all users saved in the server

    async getUsers() { 

        let response = await axios.get("http://localhost:15672/api/users/",
            {
                headers: { 'Authorization': 'Basic Z3Vlc3Q6Z3Vlc3Q=' }
            });
        
        this.setState({ usersArray: response.data });
    }

    //handle the toggle dropdown

    toggle = () => { 

        let isOpen = this.state.dropdownOpen;

        this.setState({ dropdownOpen: !isOpen });
    }

    //save the clicked username from th dropdown

    dropdownSelectionEvent = (username) => {
        this.setState({
            selectedUsername: username
        });
    }

    HandleBodyChange(event) {
        this.setState({ body: event.target.value });
    }

    //send a message

    async SendMessage() {

        let credentials = {
            Body: this.state.body,
            Destinatario: this.state.selectedUsername,
        }

        await axios.post("api/Rabbit/SendMessage", credentials);
    }

    //handle the logout 

    async LogOut() {
        await axios.delete("api/Rabbit/AbortConnection");
        this.props.history.push("/");
    }


    render() {

        //crea un array di utenti dinamicamente
        const items = [];
        for (const user of this.state.usersArray) {
            if (user.name === "guest") {
            }
            else {
                items.push(
                    <DropdownItem key={user.name} onClick={() => this.dropdownSelectionEvent(user.name)}>
                        {user.name}
                    </DropdownItem>
                )
            }
        }
      


        return (
            <div>
                <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selectedUsername}
                    </DropdownToggle>
                    <DropdownMenu>
                        {items}
                    </DropdownMenu>
                </ButtonDropdown>
                <br></br>
                <br></br>

                <InputGroup>
                    <Input onChange={this.HandleBodyChange} value={this.state.body} />
                    <InputGroupAddon addonType="append">
                        <Button color="secondary" onClick={this.SendMessage}> Send {"->"} </Button>
                    </InputGroupAddon>
                </InputGroup>
                <br></br>
                <br></br>
                <br></br>
                <Button color="secondary" onClick={this.RecievePage} >Read new messages</Button>
                <br></br>
                <br></br>
                <br></br>
                <Button variant="secondary" size="lg" block onClick={this.LogOut}>Logout</Button>

            </div>
        );
    }
}