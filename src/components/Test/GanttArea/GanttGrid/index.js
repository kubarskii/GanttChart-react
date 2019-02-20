import React, {Component} from 'react';
import '../../GanttStyles.scss';

export default class GanttGrid extends Component {


    render() {

        const {tasks, daysInMonth, calcMonthsNumber, width} = this.props;
        const {first, last} = this.props.interval;
        return (
            <div className='gantt-grid__wrapper' style={{marginTop:'-1px', display:'grid'}}>

                {tasks.map((task, i) => (
                    <div className='gantt-grid__row' key={i}
                         style={{height: '36px', display: 'flex'}}>

                        {this.props.calcMonthsNumber(first, last).map((month, i) => (
                            this.props.daysInMonth(month.year, month.month).map((day, i) =>
                                <div className='gantt-grid__cell' key={i} style={{
                                    display: 'inline-block',
                                    width: `${width}px`,
                                    height: 'inherit',
                                    borderRight: '1px solid #ccc',
                                    borderBottom: '1px solid #ccc',
                                }}>
                                </div>
                            )
                        ))}

                    </div>
                ))}

            </div>
        );
    }

}