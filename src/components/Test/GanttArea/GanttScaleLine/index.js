import React, {Component} from 'react';
import '../../GanttStyles.scss';
import './GanttScaleLine.scss'


export default class GanttScaleLine extends Component {

    constructor({interval, daysInMonth, calcMonthsNumber}) {
        super();
    }

    render() {
        const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];

        const {first, last} = this.props.interval;
        const {width} = this.props;
        return (
            <div className='gantt-scale-line__wrapper'>
                <div>
                    {width < 11
                        ?
                        <div style={{height: '18px', lineHeight: '18px', display: 'flex'}}>
                            Years
                        </div>
                        :
                        null}

                    <div className='gantt-scale-line__month-line'>
                        {this.props.calcMonthsNumber(first, last).map((month, i) => (
                            <div className='gantt gantt-scale-line__month'
                                 key={i}
                                 style={{
                                     width: `${this.props.daysInMonth(month.year, month.month).length * width}px`,
                                     background: (i % 2 > 0) ? '#d8f5ff' : 'none'
                                 }}>
                                {`${monthNames[month.month]} ${month.year}`}
                            </div>
                        ))}
                    </div>
                    {width > 11 ?
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
                        :
                        null}

                </div>
            </div>
        );
    }

}