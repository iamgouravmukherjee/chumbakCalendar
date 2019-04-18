import React, { Component } from 'react';
import { connect } from 'react-redux';
import Overlay from './Overlay';

class ViewEvent extends Component {

    render() {
        //console.log('viewEevent called', this.props);
        let value = this.props.months.filter(month => {
            return (month.index === (this.props.activeIndex))
        });
        value = value[0].weeks.filter((week) => {
            return week.index === this.props.currentWeek
        })[0].days.filter(day => {
            return day.date === this.props.currentDate
        })[0].events.filter(event => {
            return event.id === this.props.selectedPost;
        })
        return (
            <Overlay>
                {value.map(event => {
                    return (
                        <div key={event.id} className="card formCard">
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title text-uppercase">{event.title} @ <span className="text-secondary">({event.time})</span></h5>
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={this.props.hideEventInfo}>×</button>
                                </div>
                                <p className="card-text">{event.description}</p>
                                <button
                                    className="btn btn-info mr-1"
                                    onClick={() => this.props.editEvent(
                                        this.props.activeIndex,
                                        this.props.currentDate,
                                        this.props.currentWeek,
                                        this.props.selectedPost,
                                        this.props.active)}>
                                    Edit</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.props.deletePost(
                                        this.props.activeIndex,
                                        this.props.currentDate,
                                        this.props.currentWeek,
                                        this.props.selectedPost,
                                        this.props.active)}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </Overlay>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        months: state.months,
        active: state.active,
        currentDate: state.currentDate,
        currentWeek: state.currentWeek,
        action: state.action,
        selectedPost: state.selectedPost,
        activeIndex: state.activeIndex
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hideEventInfo: () => dispatch({ type: "hideEventInfo" }),
        deletePost: (activeIndex, currentDate, currentWeek, selectedPost, active) => (
            dispatch({
                type: "deletePost", payload: {
                    activeIndex, currentDate, currentWeek, selectedPost, active
                }
            })
        ),
        editEvent: (activeIndex, currentDate, currentWeek, selectedPost, active) => (
            dispatch({
                type: "editEvent",
                payload: {
                    activeIndex, currentDate, currentWeek, selectedPost, active
                }
            }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvent);