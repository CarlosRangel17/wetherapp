import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default class NavBar extends Component {
    state = { };

    handleItemClick = (e, { name }) => {
        if (name === 'home') {
            FlowRouter.go('/')
        }
        else if (name === 'convert') {
            FlowRouter.go('/convert')
        }
    }

    render() {

        const { } = this.state;

        return(
            <Menu pointing secondary inverted fluid widths={4}>
                <Menu.Item
                name='home'
                active={FlowRouter.getRouteName() === 'Home'}
                onClick={this.handleItemClick}>
                    <Icon name='home' />
                    Home
                </Menu.Item>

                <Menu.Item
                name='convert'
                active={FlowRouter.getRouteName() === 'Convert'}
                onClick={this.handleItemClick}>
                    <Icon name='recycle' />
                    Convert
                </Menu.Item>

                <Menu.Item
                name='History'
                active={FlowRouter.getRouteName() === 'History'}
                onClick={this.handleItemClick}>
                    <Icon name='history' />
                    History
                </Menu.Item>

                <Menu.Item
                name='Settings'
                active={FlowRouter.getRouteName() === 'Settings'}
                onClick={this.handleItemClick}>
                    <Icon name='settings' />
                    Settings
                </Menu.Item>
            </Menu>
        )
    }
}