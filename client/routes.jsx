import React from 'react';
import { mount } from 'react-mounter'; 
import { MainLayout } from './layouts/main_layout';
import Home from '../imports/ui/home';
import Convert from '../imports/ui/convert';

FlowRouter.route('/', {
    action() {
        mount(MainLayout, {
            component: (<Home/>)
        })
    },
    name: "Home"
})

FlowRouter.route('/convert', {
    action() {
        mount(MainLayout, {
            component: (<Convert/>)
        })
    },
    name: "Convert"
})