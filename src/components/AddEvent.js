import React, { Component } from 'react';
import { connect } from 'react-redux';

import Overlay from './Overlay';


class AddEvent extends Component {
    render() {
        //console.log('props in addevent', this.props);
        return (
            <Overlay>
                <div className="card formCard">
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.props.action === "edit" ? "Edit Event" : "Add Event"}
                        </h5>
                        <form
                            onSubmit={(event) => {
                                if (this.props.action !== "edit")
                                    this.props.addEvent(event, this.props)
                                else
                                    this.props.editEvent(event, this.props)
                            }}>
                            <div className="form-group">
                                <label htmlFor="eventTitle">Event Title</label>
                                <input name="title" type="text" className="form-control" id="eventTitle" aria-describedby="emailHelp" placeholder="Eg: Meeting" required={true} />
                                <small id="titleHelp" className="form-text text-muted">
                                    Max 10 characters</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventDescription">Event Description</label>
                                <input name="description" type="text" className="form-control" id="eventDescription" placeholder="Eg: I have a meeting tomorrow at 7:30pm " required={true} />
                                <small id="descriptionHelp" className="form-text text-muted">
                                    Max 30 characters</small>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="event colour"> Choose a colour</label>
                                        <select name="colour" className="form-control" id="event colour" required={true}>
                                            <option value="primary">Blue</option>
                                            <option value="danger">Red</option>
                                            <option value="success">Green</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="evntTime">Select time</label>
                                        <input name="time" placeholder="10:30 PM" className="form-control" type="time" id="evntTime" required={true} />
                                    </div>
                                </div>
                            </div>
                            <button
                                name={this.props.action === "edit" ? "edit" : "submit"}
                                type="submit"
                                className="btn btn-primary mr-1">
                                {this.props.action === "edit" ? "Edit" : "Submit"}
                            </button>
                            <button
                                name="close"
                                type="button" className="btn btn-light"
                                onClick={this.props.closeAddEvent}>
                                Close</button>
                        </form>
                    </div>
                </div>
            </Overlay>
        )
    }
}

const getInputs = (event, props) => {
    event.preventDefault();
    const inputs = {};
    for (let element of event.target.elements) {
        if (element.name !== "submit" && element.name !== "close" && element.name !== "edit")
            inputs[element.name] = element.value;
    }
    // //console.log('sending', { ...inputs, active: props.active, activeIndex: props.activeIndex });
    const obj = {
        ...inputs,
        id: Date.now(),
        active: props.active,
        activeIndex: props.activeIndex,
        currentDate: props.currentDate,
        currentWeek: props.currentWeek
    }
    if (props.action === "edit") {
        obj['selectedPost'] = props.selectedPost
    }
    return obj;
}

const mapStateToProps = (state) => {
    return {
        active: state.active,
        activeIndex: state.activeIndex,
        currentDate: state.currentDate,
        currentWeek: state.currentWeek,
        action: state.action,
        selectedPost: state.selectedPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (event, props) => dispatch({ type: "addEvent", payload: { ...getInputs(event, props) } }),
        editEvent: (event, props) => dispatch({
            type: "editEventInfo", payload: { ...getInputs(event, props) }
        }),
        closeAddEvent: () => dispatch({ type: "closeAddEvent" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);