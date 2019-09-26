import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { clearEvents} from '../store/actions/events'
import PropTypes from 'prop-types';

class Events extends Component
{

    constructor(props) 
    {
        super(props);

        this.state = {
            university: ''
        };
    }

    render() {


        return(
            <Container>
                <ListGroup style={{opacity: .85}}>
                    <TransitionGroup className="events-list">
                        {this.props.events.map(({ idEvent, eventName,
                         name, time, date }) => (
                            <CSSTransition key={idEvent} timeout={700} classNames="fade">
                                <ListGroupItem>
                                    {name + " | "}
                                    {eventName}
                                    {" | "}
                                    {time}
                                    {" | "}
                                    {date}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

Events.propTypes = 
{   
    clearEvents: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    university: state.events.current_location,
    events: state.events.events,
    auth: state.auth,
});

// first param = mapping, 2nd = actions, 3rd = component we are connecting to state
export default connect(mapStateToProps, {clearEvents})(Events);