import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

function Post(props) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h3" component="h3">
                    {props.title}
                </Typography>
                <Typography variant="body2">
                    {props.content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained">DETAIL</Button>
                <Button size="small" variant="contained" color="primary">EDIT</Button>
                <Button size="small" variant="contained" color="secondary" startIcon={<DeleteIcon/>}>DELETE</Button>
            </CardActions>
        </Card>
    );
}

export default Post;
