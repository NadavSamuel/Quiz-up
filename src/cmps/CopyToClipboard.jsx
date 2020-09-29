import React from 'react';
import { connect } from 'react-redux'
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { setNotification } from '../store/actions/notificationActions';


export class _CopyToClipboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { copySuccess: '' }
    }

    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' },()=>{
            this.props.setNotification('success',this.state.copySuccess)
        });
    };

    render() {
        return (
            <div className='copy-to-clipboard'>
                {
                    document.queryCommandSupported('copy') &&
                    <div>
                        <button onClick={this.copyToClipboard}>Copy Link</button>
                    </div>
                }
                <form>
                    <textarea
                        ref={(textarea) => this.textArea = textarea}
                        value={window.location} onChange={()=>{}}
                    />
                </form>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
    setNotification

}

export const CopyToClipboard = connect(mapStateToProps, mapDispatchToProps)(_CopyToClipboard)


