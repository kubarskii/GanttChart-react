import React, {Component} from 'react';
import '../../GanttStyles.scss';

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
            <div className='gantt-scale-line__wrapper'
                 style={{display: 'inline-block', textAlign: 'center', border: '1px solid #ccc', borderLeft: 'none'}}>
                <div>

                    {width < 11
                        ?
                        <div style={{height: '18px', lineHeight: '18px', display: 'flex'}}>
                            Years
                        </div>
                        :
                        null}

                    <div style={{height: '18px', lineHeight: '18px', borderBottom: '1px solid #ccc', display: 'flex'}}>
                        {this.props.calcMonthsNumber(first, last).map((month, i) => (
                            <div className='gantt' key={i}
                                 style={{
                                     width: `${this.props.daysInMonth(month.year, month.month).length * width}px`,
                                     textAlign: 'center',
                                     height: 'inherit',
                                     borderRight: '1px solid #ccc',
                                     flex: 'auto',
                                     background: (i % 2 > 0) ? '#d8f5ff' : 'none'
                                 }}>
                                {`${monthNames[month.month]} ${month.year}`}
                            </div>
                        ))}
                    </div>
                    {width > 11 ?
                        <div style={{height: '18px', lineHeight: '18px', display: 'flex'}}>
                            {this.props.calcMonthsNumber(first, last).map((month, i) => (
                                this.props.daysInMonth(month.year, month.month).map((day, i) =>
                                    <div className='gantt' key={i}
                                         style={{
                                             width: `${width}px`,
                                             height: 'inherit',
                                             borderRight: '1px solid #ccc'
                                         }}>
                                        <div style={{maxWidth:'100%', overflow:'hidden', textOverflow:'ellipsis'}}>{day}</div>
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