import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getReorders } from "./utils";
import { Button, Switch } from "@material-ui/core";
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

class Reorders extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        this.classes = useStyles;
        this.loadReorders = this.loadReorders.bind(this);
    }

    loadReorders() {
        getReorders()
            .then(res => {
                this.setState({ data: res.results });
            })
            .catch();
    }

    componentDidMount() {
        this.loadReorders();
    }

    render() {
        const { data } = this.state;
        return (
            <Paper className={this.classes.root}>
                <Table className={this.classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Processed</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.inventory}
                                </TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell><Switch checked={row.status} /></TableCell>
                                <TableCell>
                                    {(!row.status) &&
                                        <Button><Link to={`/ProcessReorders/` + row.id}>Process</Link></Button>
                                    }
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default Reorders;