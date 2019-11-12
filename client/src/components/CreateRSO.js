import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, NavLink} from 'reactstrap';
import { connect } from 'react-redux';

class CreateRSO extends Component 
{
    // Component state, different from redux/application state
    state = 
    {
        modal: false,
        name: ''
    }

    toggle = () => 
    {
        this.setState({
            modal: !this.state.modal,
        });

    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        
    }

    onSubmit = (e) => {
        e.preventDefault();

        //const { id, university_id } = this.props.auth.user;

        // const event = {
        //     name: this.state.name,
        //     RSOs_admin_id: id,
        //     RSOs_university_id: university_id
        // }

        // TODO: Create RSO function

        // Close modal
        this.toggle();

        this.setState({
            modal: false,
            name: ''
        });
    }

    render()
    {
        return (
            <div>
                <NavLink href="#"
                    color="light"
                    onClick={this.toggle}
                >Create RSO</NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create New RSO</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={this.onChange}/>
                                <Button
                                    color="primary"
                                    style={{marginTop: '2rem'}}
                                    block
                                >Create RSO</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { })(CreateRSO);