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

        switch (zoom) {
            case 'day':
                return (
                    <div className='gantt-scale-line__wrapper'>
                        <div>
                            <div className='gantt-scale-line__month-line'>
                                {this.renderMonth(first, last, width, zoom)}
                            </div>
                            <div>
                                {width > 11 ? this.renderDays(first, last, width) : null}
                            </div>
                        </div>
                    </div>
                );

            case 'month':
                return (
                    <div className='gantt-scale-line__wrapper'>
                        <div className='gantt-scale-line__month-line' style={{borderRight:'1px solid #ccc'}}>
                            {this.renderYear(first, last, width)}
                        </div>
                        <div className='gantt-scale-line__month-line'>
                            {this.renderMonth(first, last, width, zoom)}
                        </div>
                    </div>
                );
        }
    }

    renderMonth = (first, last, width, zoom) => {
        const calcMonthsNumber = this.props.calcMonthsNumber;
        switch (zoom) {
            case 'day':
                return (
                    calcMonthsNumber(first, last).map((month, i) => (
                        <div className='gantt gantt-scale-line__month'
                             key={i}
                             style={{
                                 width: `${this.props.daysInMonth(month.year, month.month).length * width}px`,
                                 background: (i % 2 > 0) ? '#d8f5ff' : 'none'
                             }}>
                            {`${monthNames[month.month]} ${month.year}`}
                        </div>
                    ))
                );

            case 'month':
                return (
                    calcMonthsNumber(first, last).map((month, i) => (
                            <div className='gantt gantt-scale-line__month'
                                 key={i}
                                 style={{
                                     width: `${this.props.daysInMonth(month.year, month.month).length * width * 10}px`,
                                     background: (i % 2 > 0) ? '#d8f5ff' : 'none'
                                 }}>
                                {`${monthNames[month.month]} ${month.year}`}
                            </div>
                        )
                    )
                );
        }

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
    }


    renderYear = (first, last, width) => {
        return(
            <div></div>
        );
    }

}