import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing.unit * 2,
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing.unit,
    },
});

class Modal extends Component {
    state = {
        fullWidth: true,
        maxWidth: 'xl',
    };

    DEFAULT_TASK = {
        id: 1,
        type: 'task',
        name: '',
        begin: new Date(),
        end: new Date(),
        progress: 0,
        links: [],
        level: 0,
    };

    handleMaxWidthChange = event => {
        this.setState({maxWidth: event.target.value});
    };

    handleFullWidthChange = event => {
        this.setState({fullWidth: event.target.checked});
    };


    render() {
        let {open, handleClose, title, modalData, changeTaskData} = this.props;

        if (modalData === {}) {
            modalData = this.DEFAULT_TASK;
        }

        return (
            <React.Fragment>
                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
                    <DialogContent>

                        <form>

                            <input type='text' onChange={changeTaskData} value={modalData.id} placeholder={''}/>

                            <input type='text' onChange={() => {
                            }} value={modalData.type}/>
                            <input type='text' onChange={() => {
                            }} value={modalData.name}/>
                            <input type='text' onChange={() => {
                            }} value={modalData.begin}/>
                            <input type='text' onChange={() => {
                            }} value={modalData.end}/>
                            <input type='text' onChange={() => {
                            }} value={modalData.progress}/>
                            <input type='text' onChange={() => {
                            }} value={Number(modalData.level) + 1}/>

                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Close
                        </Button>
                        <Button color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}


export default withStyles(styles)(Modal);