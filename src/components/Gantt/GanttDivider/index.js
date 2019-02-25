import React, {Component} from 'react';
import './GanttDevider.scss';

export default class GanttDevider extends Component {

    render() {
        const {onMouseDown, onMouseUp} = this.props;
        return (
            <div className='devider' onMouseDown={onMouseDown} onMouseUp={onMouseUp}></div>
        );
    }

}