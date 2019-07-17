import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { TextField } from '@material-ui/core';
import { sellInventory } from './utils';

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



export default function Sell(props) {
    const classes = useStyles();

    const sell = () => {
        let quantity = document.getElementById('quantity').value;
        let inventory = props.match.params['id'];

        let data = {
            'quantity': parseInt(quantity),
            'inventory': parseInt(inventory)
        };

        sellInventory(data)
            .then(res => {
                if(res){
                    props.history.push('/Inventory');
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Sell Inventory
            </Typography>
                <Typography variant="body2" component="p">
                    <TextField
                        id="quantity"
                        label="Quantity"
                        className={classes.textField}
                        type="number"
                        autoComplete="Quantity"
                        margin="normal"
                    />
                </Typography>
            </CardContent>
            <CardActions>
                <Typography variant="body2" component="p">
                    <Button onClick={sell} size="small">Sell</Button>
                </Typography>
            </CardActions>
        </Card>
    );
}
