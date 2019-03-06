import React, {Component} from 'react';
import {monthEngNames} from '../../../../constants/monthsNames'
import '../../GanttStyles.scss';
import './GanttScaleLine.scss'

const monthNames = monthEngNames;

export default class GanttScaleLine extends Component {

    constructor({interval, daysInMonth, calcMonthsNumber}) {
        super();
    }


    render() {


        const {first, last} = this.props.interval;
        const {width, zoom} = this.props;
        return (
            <div className='gantt-scale-line__wrapper'>
                {zoom === 'month' ?
                    <div className='gantt-scale-line__month-line' style={{borderRight: '1px solid #ccc'}}>
                        {this.renderYear(first, last, width)}
                    </div> : null}

                <div className='gantt-scale-line__month-line'>
                    {this.renderMonth(first, last, width)}
                </div>
                {zoom === 'day' ?
                    <div className='gantt-scale-line__month-line'>
                        {this.renderDays(first, last, width)}
                    </div> : null}
            </div>
        );

    }

    renderMonth = (first, last, width) => {
        const calcMonthsNumber = this.props.calcMonthsNumber;
        return (
            calcMonthsNumber(first, last).map((month, i) => (
                <div className='gantt gantt-scale-line__month'
                     key={i}
                     style={{
                         width: `${this.props.daysInMonth(month.year, month.month).length * width}px`,
                         background: (i % 2 > 0) ? '#cccccc45' : 'none'
                     }}>
                    <div>{`${monthNames[month.month]} ${month.year}`}</div>
                </div>
            ))
        );

    };

    renderDays = (first, last, width) => {
        return (
            <div className='gantt-scale-line__day-line' style={{}}>
                {this.props.calcMonthsNumber(first, last).map((month, i) => (
                    this.props.daysInMonth(month.year, month.month).map((day, i) =>

                        <div className='gantt gantt-scale-line__day-wrapper' key={i}
                             style={{width: `${width}px`,}}>
                            <div
                                className={`${'gantt-scale-line__day ' + this.isWeekend(new Date(month.year, month.month, day - 1).getDay())}`}>{day}</div>
                        </div>
                    )
                ))}
            </div>
        );
    };

    isWeekend = (day) => {
        return (day === 6 || day === 5) ? 'weekend' : '';
    };

    renderYear = (first, last, width) => {
        return (
            <div></div>
        );
    }

}