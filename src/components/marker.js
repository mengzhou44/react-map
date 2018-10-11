import React, { PureComponent } from 'react';

export default class Place extends PureComponent {

    render() {
        let className = 'hint hint--html hint--info hint--top marker';

        if (this.props.hover) {
            className = 'hint hint--html hint--info hint--top marker marker--hover';
        }
        return (
            <div className={className} >
                <div style={{ width: 80 }} className='hint__content'>
                    {this.props.text}
                </div>
            </div>
        );
    }
}


