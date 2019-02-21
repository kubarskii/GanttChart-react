import React, {Component} from 'react';
import '../../GanttStyles.scss';
import './GanttScaleLine.scss'


const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

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
                         background: (i % 2 > 0) ? '#d8f5ff' : 'none'
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
                            <div className='gantt-scale-line__day'>{day}</div>
                        </div>
                    )
                ))}
            </div>
        );
    };


    renderYear = (first, last, width) => {
        return (
            <div></div>
        );
    }

}