import React, { Component } from 'react';
import { connect } from 'react-redux';

class Overlay extends Component {
    render() {
            return (
                <div className="overlay">{this.props.children}</div>
            )
    }
}


const mapStateToProps = (state) => {
    return {
        months: state.months,
        active: state.active,
        showPopup: state.showPopup,
        viewPost: state.viewPost
    }
}

export default connect(mapStateToProps)(Overlay);