import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
   render() {
      //console.log("nabar props", this.props)
      const month = this.props.months.filter(month => {
         return month.index === this.props.activeIndex;
      })
      const name = month[0]['name'] || month[0]['active'];
      //console.log('im navbar', month[0]);
      return (
         <div className="header z-depth-1 d-flex px-5 justify-content-between">
            {/* <Link to="/"> */}
            <div className="appName mr-3">CALENDAR</div>
            <div className="appName d-flex">
               <div
                  className="previousMonth"
                  onClick={() => this.props.previousMonth(this.props.activeIndex)}> > </div>
               <div className="text-uppercase px-3">{name}</div>
               <div className="nextMonth" onClick={() => this.props.nextMonth(this.props.activeIndex)}>></div>
            </div>
            {/* </Link> */}
         </div>
      )
   }
}
const mapStateToProps = (state) => {
   return {
      active: state.active,
      activeIndex: state.activeIndex,
      months: state.months
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      previousMonth: (index) => dispatch({ type: "previousMonth", index }),
      nextMonth: (index) => dispatch({ type: "nextMonth", index })
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);