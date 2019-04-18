import React, { Component } from 'react';
import { connect } from 'react-redux';

import ViewEvent from './viewEvent';
import AddEvent from './AddEvent';


class Calendar extends Component {

    showButton = (id, isEnabled) => {
        if (isEnabled) {
            document.getElementById(id).style.display = "block";
        }
    }
    hideButton = (id, isEnabled) => {
        if (isEnabled) {
            document.getElementById(id).style.display = "none";
        }
    }


    render() {
        // //console.log('render called', this.props);
        const month = this.props.months.filter(month => {
            return (month.index === this.props.activeIndex)
        });
        //console.log('calendar',month);
        const addEvent = this.props.showPopup ? <AddEvent /> : null;
        const showEvent = this.props.showEvent ? <ViewEvent /> : null;
        return (
            <div className="container-fluid table-responsive" style={{ paddingTop: "100px" }}>
                {addEvent}
                {showEvent}
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">Sunday</th>
                            <th scope="col">Monday</th>
                            <th scope="col">Tuesday</th>
                            <th scope="col">Wednesday</th>
                            <th scope="col">Thursday</th>
                            <th scope="col">Friday</th>
                            <th scope="col">Saturday</th>
                        </tr>
                    </thead>
                    <tbody>
                        {month[0].weeks.map((week) => {
                            return (
                                <tr key={week.index}>
                                    {week.days.map(day => {
                                        return (
                                            <td className={!day.enabled ? "disabled" : null} key={day.date}
                                                onMouseEnter={() => this.showButton(day.date, day.enabled)}
                                                onMouseLeave={() => this.hideButton(day.date, day.enabled)}
                                            >
                                                <div className="calendarDate">
                                                    <div className="align-self-end">{day.date} </div>

                                                    {day.events.map((event, index) => {
                                                        return (
                                                            <div
                                                                key={event.id}
                                                                className={`badge badge-${event.colour} mb-1 text-capitalize`}
                                                                onClick={() => this.props.viewPost(event.id, week.index, day.date)}>
                                                                {event.title}
                                                            </div>
                                                        )
                                                    })}

                                                    {day.enabled && <button
                                                        className="btn btn-primary addEvent eventButton"
                                                        id={day.date}
                                                        onClick={() => this.props.showForm(day.date, week.index)}
                                                    >+</button>}
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        months: state.months,
        active: state.active,
        showPopup: state.showPopup,
        showEvent: state.showEvent,
        selectedPost: state.selectedPost,
        activeIndex: state.activeIndex,
        currentDate: state.currentDate,
        currentWeek: state.currentWeek,
        action: state.action
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showForm: (date, week) => dispatch({ type: "showForm", date, week }),
        viewPost: (id, week, date) => dispatch({ type: "viewPost", id, week, date })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);