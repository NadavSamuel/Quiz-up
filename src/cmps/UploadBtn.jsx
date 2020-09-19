import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(0),
        padding: theme.spacing(1.2)

    },
}));
export function UploadBtn({ uploadImg }) {
    const classes = useStyles();

    return (
        <div className="upload-btn">
            <label htmlFor="upload">
            <Button variant="contained" color="default" id="upload" className={classes.button} endIcon={<ImageIcon />}>
                Upload </Button></label>
                <input type="file" id="upload" onChange={uploadImg} />
        </div>
    )
}
