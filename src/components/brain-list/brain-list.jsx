import React, {Component} from 'react';
import Brain from "../brain/brain";
import './brain-list.scss';
import moment from "moment";

class BrainList extends Component {
    renderFullBrains(noOfBrains) {
        const brainList = [];
        for (let i = 0; i < noOfBrains; i++) {
            brainList.push(
                <div key={`full_${i}`} className='brain-list-child'>
                    <Brain animate={false} filled={90}/>
                </div>
            );
        }
        return brainList;
    }

    render() {
        if (this.props.startDate) {
            const startDate = moment(this.props.startDate.seconds * 1000);
            const days = moment().diff(startDate, 'days');
            const mainBrainFilled = days % 90;
            const fullBrains = Math.floor(days / 90);
            return (
                <div className='brain-root'>
                    <div className='main-brain'>
                        <Brain animate={true} days={days} filled={mainBrainFilled}/>
                    </div>
                    {
                        fullBrains > 0 && (
                            <div className="brain-list">
                                <div className="brain-list-header">
                                    Completed Brains : {fullBrains}
                                </div>
                                {this.renderFullBrains(fullBrains)}
                            </div>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div className='brain-root'>
                    <div className='main-brain'>
                        <Brain message={(
                            <div>
                                No Data<br/>
                                Update Profile To Start a Streak
                            </div>
                        )} filled={0}/>
                    </div>
                </div>
            );
        }
    }
}

export default BrainList;
