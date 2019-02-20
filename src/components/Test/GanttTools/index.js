import React, {Component} from 'react';

export default class GanttTools extends Component {

    render() {
        const {zoomIn, zoomOut} = this.props;
        return (

            <div style={{display:'flex', flexDirection: 'row'}}>
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
            </div>

        );
    }

}