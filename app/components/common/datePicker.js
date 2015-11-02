import React from 'react';
import DayPicker from 'react-day-picker';
import { isSameDay } from './DateUtils';

import '../../style/DayPicker.scss';
import  '../../style/SelectableDayExample.scss';

class datePicker extends React.Component{

  constructor(props) {
   super(props);
   this.handleDayClick = this.handleDayClick.bind(this);
   this.state = {
                 selectedDay: new Date()
               };
             }

  handleDayClick(e, day) {
    this.setState({
      selectedDay: day
    });
    this.props.handleChange(day.toLocaleDateString());
  }

  render() {
    let { selectedDay } = this.state;

    let modifiers = {
      'selected': (day) => isSameDay(selectedDay, day)
    };

    return (
      <div className="SelectableDayExample">
        <DayPicker
          numberOfMonths={1}
          enableOutsideDays={true}
          modifiers={ modifiers }
          onDayClick={this.handleDayClick}
        />
        <p>
          Selected: { selectedDay.toLocaleDateString() }
        </p>
      </div>
    );
  }


}
export default datePicker;
datePicker.propTypes = {
 handleChange: React.PropTypes.any
};
