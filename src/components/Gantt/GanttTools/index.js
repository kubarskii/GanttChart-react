import React, {Component} from 'react';

export default class GanttTools extends Component {

    render() {
        const {zoomIn, zoomOut, toDay, toMonth} = this.props;
        return (
            <div style={{display:'flex', flexDirection: 'row',position:'fixed'}}>
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
                <button onClick={toDay}>Day</button>
                <button onClick={toMonth}>Month</button>
            </div>

        );
    }

}