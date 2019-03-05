import React, {Component} from 'react';
import './GanttDevider.scss';

export default class GanttDevider extends Component {

    render() {
        const {onMouseDown, onMouseUp} = this.props;
        return (
            <div className='divider' onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{left:`${document.body.offsetWidth/2}px`}}>
                <div className='dots-wrapper'>
                    <div className='round-dot'></div>
                    <div className='round-dot'></div>
                    <div className='round-dot'></div>
                    <div className='round-dot'></div>
                </div>
            </div>
        );
    }

}