import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getInventory } from "./utils";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

class Inventory extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.classes = useStyles;
        this.loadInventory = this.loadInventory.bind(this);
    }

    loadInventory() {
        getInventory()
            .then(res => {
                this.setState({ data: res.results });
            })
            .catch();
    }

    componentDidMount() {
        this.loadInventory();
    }

    render() {
        const { data } = this.state;
        return (
            <Paper className={this.classes.root}>
                <Table className={this.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Reorder Level</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.reorder_level}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>
                                    <Button><Link to={`/Sell/` + row.id}>Sell</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Inventory;