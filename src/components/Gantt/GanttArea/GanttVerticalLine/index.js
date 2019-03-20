import React, {Component} from 'react';

class VerticalLine extends Component {

    marginLine = (date) => {
        const interval = this.props.createInterval();
        const dateTimestamp = Date.parse(date);
        const first = Date.parse(interval.first);
        const last = Date.parse(interval.last);

        if ((dateTimestamp < first) && (dateTimestamp > last)) {
            return false;
        } else {
            return 0;
        }
    };

    render() {
        const {title, date} = this.props;
        console.log('VL:', date);
        return (
            <div className='vertical-line__wrapper'
                 style={{
                     left: `${this.props.width * this.props.calcMargin(Date.parse(date))}px`,
                     position: 'absolute',
                     top: '0'
                 }}>
                <div className='vertical-line__title' style={{
                    height: '18px',
                    lineHeight: '18px',
                    background: '#00800075',
                    color: '#fff',
                    padding: ' 1px 3px 1px 3px',
                    fontSize: '13px'
                }}>
                    {title}
                    <div className='vertical-line__line'
                         style={{
                             position: 'absolute',
                             height: '100vh',
                             width: '3px',
                             background: '#00800075',
                             left: '0px',
                         }}/>
                </div>

            </div>
        );
    }

}

export default VerticalLine;