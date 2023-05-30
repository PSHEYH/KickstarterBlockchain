import React, { Component } from "react";
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';


class ContributeForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        value: '',
        isLoading: false,
        error: ''
    };

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({ isLoading: true });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute()
                .send({
                    from: accounts[0],
                    value: web3.utils.toWei(this.state.value, 'ether')
                });

            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (error) {
            this.setState({ error: error.message });
        }

        this.setState({ isLoading: false, value: '' });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.error}>
                <Form.Field>
                    <label> Amount of contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>
                <Message error header="Oops" content={this.state.error}></Message>
                <Button primary loading={this.state.isLoading}>
                    Contribute!
                </Button>
            </Form>
        )
    }
}

export default ContributeForm;