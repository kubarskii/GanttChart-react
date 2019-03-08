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
                    <div className='gantt-scale-line__year-line' style={{borderRight: '1px solid #ccc'}}>
                        {this.renderYear(first, last, width, this.props.calcMonthNumber)}
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
                         maxWidth: `${this.props.daysInMonth(month.year, month.month).length * width}px`,
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
        const calcMonthsNumber = this.props.calcMonthsNumber;
        const lastYear = last.getFullYear();
        const firstYear = first.getFullYear();
        const differnce = lastYear - firstYear;
        const years = [];
        let firstD, lastD;

        for (let i = 0; i <= differnce; i++) {
            if (i === 0) {
                firstD = first;
            } else {
                firstD = new Date(firstD.getFullYear() + 1, 0, 1);
            }

            if (i === differnce) {
                lastD = last;
            } else {
                lastD = new Date(firstD.getFullYear(), 11, 31);
            }

            years.push({year: firstYear + i, first: firstD, last: lastD});
        }
        return (
            <div className='gantt-scale-line__year-line' style={{}}>
                {years.map(({year, first, last}, i) => (
                    <div key={i} style={{
                        width: `${calcMonthsNumber(first, last).length * width}px`,
                        borderRight: '1px solid #ccc',
                        borderBottom: '1px solid #ccc',
                        background:`${(i%2===0)?'rgba(204, 204, 204, 0.27)':'#fff'}`
                    }}>{year}</div>
                ))}
            </div>
        );
    }

}