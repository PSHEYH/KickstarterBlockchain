import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Link, Router } from '../../routes';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        isLoading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            Router.pushRoute('/');
        } catch (error) {
            this.setState({ errorMessage: error.message })
        }
        this.setState({ isLoading: false });
    }

    render() {
        return (<Layout>
            <h3> Create a Campaign</h3>
            <Form onSubmit={this.onSubmit} error={this.state.errorMessage}>
                <Form.Field>
                    <label> Minimum Contribution</label>
                    <Input
                        value={this.state.minimumContribution}
                        label='wei'
                        labelPosition='right'
                        onChange={event => this.setState(
                            { minimumContribution: event.target.value }
                        )}
                    />
                </Form.Field>
                <Message error header="Oops" content={this.state.errorMessage}></Message>
                <Button loading={this.state.isLoading} primary>Create!</Button>
            </Form>
        </Layout>
        )
    }
}

export default CampaignNew;