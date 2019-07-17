import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { processReorders, getReorders } from './utils';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});



export default function ProcessReorders(props) {
    const classes = useStyles();

    const [quantity, setQuantity] = React.useState(0);

    const process = () => {
        let quantity = document.getElementById('quantity').value;
        let inventory = props.match.params['id'];

        let data = {
            'quantity': parseInt(quantity),
            'id': parseInt(inventory)
        };

        processReorders(data)
            .then(res => {
                if (res) {
                    props.history.push('/Reorders');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    getReorders(props.match.params['id'])
        .then(res => {
            setQuantity(res.quantity)
        })
        .catch(error => {
            return error;
        });


    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Dispatch Inventory
            </Typography>
                <Typography variant="body2" component="p">
                    <TextField
                        id="quantity"
                        label="Quantity"
                        value={quantity}
                        className={classes.textField}
                        type="number"
                        // autoComplete="Quantity"
                        margin="normal"
                    />
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant="body2" component="p">
                    <Button onClick={process} size="small">Dispatch</Button>
                </Typography>
            </CardActions>
        </Card>
    );
}
