import React from 'react';
import { Header, Container, Divider, Icon, Grid } from 'semantic-ui-react';
import NavBar from '../../imports/ui/navbar';

export const MainLayout = ({component}) => (
    <div>
        <Container>
            
            <br/>
            <Header icon style={{fontSize: '3em'}} as='h1' inverted textAlign={'center'}>  
                <Header.Content>
                    <Icon name={'globe'} size={'massive'} />
                    wETH {'<>'} ETH
                </Header.Content>

                <Header.Subheader>
                    Conversion Application
                </Header.Subheader>
            </Header>
            
            <Divider/>
            
            <NavBar/>

            <Divider/>
            
            <div style={{minHeight:'500px'}}>
                {component}
            </div>

            <Divider/>

            <br/>
            <br/>

            <Header style={{fontSize: '1.2em'}} as='h1' inverted textAlign={'center'}>  
                by Carlos Rangel
            </Header>

        </Container>  

    </div>
)