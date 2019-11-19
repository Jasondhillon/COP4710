import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Alert} from 'reactstrap';
import { connect } from 'react-redux';
import { getRSOsAdmin } from '../store/actions/info';
import { createEvent } from '../store/actions/events';

class EventModal extends Component 
{
    // Component state, different from redux/application state
    state = 
    {
        modal: false,
        name: '',
        eventName: '',
        category: 'Meeting',
        description: '',
        time: '',
        time_period: 'PM',
        date: '',
        location: '',
        phone: '',
        email: '',
        status: 'rso',
        university: '',
        rso: 0,
        admin_id: '',
        approved: '',
        msg: null
    }

    componentDidMount()
    {
        this.props.getRSOsAdmin(this.props.auth.user.id);
    }

    toggle = () => 
    {
        this.setState({
            modal: !this.state.modal,
            rso: this.props.rsos[0].idRSO,
            eventName: this.props.rsos[0].name
        });

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
    }

    onSelect = (e) => {
        const [name, id] = e.target.value.split(",");

        this.setState({
            rso: id, 
            eventName:name
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { id, university_id } = this.props.auth.user;

        let app = 0;

        if (this.state.rso !== "42")
        {
            app = 1;
        }

        if (!Number.isInteger(this.state.time))
            this.setState({msg: 'Time is in the wrong format (H)'})

        // TODO: Make sure no duplicate events occur at same location and at the same time
        
        else
        {
            const event = {
                name: this.state.name,
                eventName: this.state.eventName,
                category: this.state.category,
                description: this.state.description,
                time: this.state.time + time.state.time_period,
                date: this.state.date,
                location: this.state.location,
                phone: this.state.phone,
                email: this.state.email,
                status: this.state.status,
                Events_university_id: university_id,
                Events_RSO_id: this.state.rso,
                Events_admin_id: id,
                approved: app
            }
            this.props.createEvent(event);

            // Close modal
            this.toggle();

            this.setState({
                modal: false,
                name: '',
                eventName:'',
                category: 'Meeting',
                description: '',
                time: '',
                time_period: 'PM',
                date: '',
                location: '',
                phone: '',
                email: '',
                status: 'rso',
                university: '',
                rso: this.props.rsos[0].idRSO,
                admin_id: '',
                approved: 0
            });
        }
    }

    render()
    {
        return (
            <div>
                <Button
                    color="light"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Create Event</Button>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Event</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label>Choose RSO to make the event for:</Label>
                                <Input type="select" name="rso" id="rso" onChange={this.onSelect}>
                                    {this.props.rsos.map(({ name, idRSO, approved }) => (
                                    <option 
                                        disabled={approved ? false : true}
                                        key ={name} 
                                        value = {[name, idRSO]}>
                                    {name} {approved ? "" : " (Unapproved)"}
                                    </option>
                                ))}
                                </Input>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Event name"
                                    onChange={this.onChange}/>
                                <Input type="select" name="category" id="category" onChange={this.onChange}>
                                    <option value = "Meeting">Meeting</option>
                                    <option value = "Social">Social</option>
                                    <option value = "Fundraising">Fundraising</option>
                                    <option value = "Tech Talks">Tech Talks</option>
                                    <option value = "Guest Speaker">Guest Speaker</option>
                                </Input>
                                <Input
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="Description"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="time"
                                    id="time"
                                    placeholder="Time"
                                    onChange={this.onChange}/>
                                <Input type="select" name="time_period" id="time_period" onChange={this.onChange}>
                                    <option value="PM">PM</option>
                                    <option value="AM">AM</option>
                                </Input>
                                <Input
                                    type="text"
                                    name="date"
                                    id="date"
                                    placeholder="Date"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="location"
                                    id="location"
                                    placeholder="Location"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Phone"
                                    onChange={this.onChange}/>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}/>
                                <Input type="select" name="status" id="status" onChange={this.onChange}>
                                    <option value = "rso">Club Members only</option>
                                    <option value = "private">College Event</option>
                                    <option value = "public">Public Event</option>
                                </Input>
                                <Button
                                    color="primary"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Create Event</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    rsos: state.info.rsosAdmin
});

export default connect(mapStateToProps, { getRSOsAdmin, createEvent })(EventModal);