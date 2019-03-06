import React, {Component} from 'react';
import './GanttDevider.scss';

export default class GanttDivider extends Component {

    render() {
        const {onMouseDown, onMouseUp} = this.props;
        return (
            <div className='divider' onMouseDown={onMouseDown} onMouseUp={onMouseUp} style={{left:`${document.body.offsetWidth/2}px`}}>
                <div className='dots-wrapper'>
                    <div className='round-dot'/>
                    <div className='round-dot'/>
                    <div className='round-dot'/>
                    <div className='round-dot'/>
                </div>
            </div>
        );
    }

}