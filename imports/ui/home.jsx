import React, { Component } from 'react';
import { Header, Grid, Button, Input, Icon } from 'semantic-ui-react';

// Notes
// - "payable" accepts both true & false, and is what determines if the function accepts
//    actual ether (ETH) therefore, you won't be able to pay in ETH
//    >>
//    there should be at least one "payable" = true to allow initiating this smart contract
//    with ETH i.e. typically the deposit function
// - "outputs" are what you will get out of the function, with any given name(s)
// - "stateMutability" - indicates if there are state changes
// >>
//   "stateMutability" -set to "view" if there aren't any state changes AND you're not updating the value
//    of a balance

const wETH_ABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "guy",
				"type": "address"
			},
			{
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "src",
				"type": "address"
			},
			{
				"name": "dst",
				"type": "address"
			},
			{
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "dst",
				"type": "address"
			},
			{
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "src",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "guy",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "src",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "dst",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "dst",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "src",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "wad",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	}
]

const wETH_kADD = "0xd0a1e359811322d97991e03f863a0c30c2cf029c";

export default class Home extends Component {

    //
    state = {
        balanceCheck: '',
        wETH: 0,
        ETH: 0,
        preETH: 0,
        preWETH: 0
    };

    componentWillMount() {
        // 1s ping on ETH / wETH balance (kovan)
        this.setState({
            balanceCheck: setInterval(this.updateBalance, 1000)
        });
    }

    updateBalance = () => {

        // 42 - tongue-in-cheek # that identifies the kovan
        // console.log(web3.currentProvider.publicConfigStore._state.networkVersion);
        if (web3.currentProvider.networkVersion === '42') {

            // console.log('*** Kovan network detected ***');
            // Note:
            // - balanceOf() contains 3 parameters:
            //      1) Our MetaMask Account
            //      2) A JSON Struct / Our MetaMask Account
            //      3) A Callback Function | e --> Error, r --> Result
            // >>
            // - balanceOf(web3.eth.accounts[0], ...) is a way for us to get our own MetaMask account

            // Logs to view web3.eth > accounts 
            // console.log('web3.eth.accounts[0]', web3.eth.accounts[0]);
            // console.log('web3.eth.accounts', web3.eth.accounts)
            // console.log('web3.eth.getAccounts()', web3.eth.getAccounts());
            
            let metaMaskAccount = web3.eth.accounts[0] 
                ? web3.eth.accounts[0]
                : '0x8808c4E990369293375BA5e0e5B8cB6f113e5E5e';
            // console.log('Using web3.eth.accounts[0]', web3.eth.accounts[0] ? 'Yes' : 'No');

            // Forum recommended 
            // URL - https://ethereum.stackexchange.com/questions/16962/metamask-web3-eth-account0-is-undefined
            // web3.eth.getAccounts(function(error, accounts) {
            //     console.log('accounts', accounts);
            //     console.log('error', error);
            // });

            web3.eth.contract(wETH_ABI).at(wETH_kADD).balanceOf(metaMaskAccount, {
                from: metaMaskAccount
            }, function (e, r) {
                // If there are no errors detected
                if (!e) {
                    // Accessing the return variable 'r' for the data structure that's returned
                    // console.log('r', r);
                    this.setState({
                        wETH: r.c[0] / 10000 // Must offset by 10,000 
                    });
                }
            }.bind(this));

            // console.log('web3.eth.coinbase', web3.eth.coinbase);
            web3.eth.getBalance(web3.eth.coinbase, function(e, r) {
                if (!e) {
                    this.setState({
                        ETH: (web3.fromWei(r)).toFixed(2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    });
                }
            }.bind(this));

            // **** Original code by John Quarnstrom ****
            // web3.eth.contract(erc20_abi).at('0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359').balanceOf(web3.eth.accounts[0], {
            //     from: web3.eth.accounts[0]
            // }, function(e,r) {
            //     if(!e) {
            //         this.setState( {dai: (web3.fromWei(r)).toFixed(2) })
            //     }
            // }.bind(this));

            // web3.eth.contract(erc20_abi).at('0xA0B86991c6218b36c1d19D4a2e9Eb0cE3606eB48').balanceOf(web3.eth.accounts[0], {
            //     from: web3.eth.accounts[0]
            // }, function(e,r) {
            //     if(!e) {
            //         this.setState( {usdc: (web3.fromWei(r, 'lovelace')).toFixed(2) })
            //     }
            // }.bind(this));
        }

    }

    // A bit of optimization - This will clear this from pinging the blockchain every sec
    componentWillUnmount() {
        const { balanceCheck } = this.state;
        clearInterval(balanceCheck);
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleConvertETH = (amount) => {
        // console.log('Amount:', amount);
        // console.log('Amount to Wei:', web3.toWei(amount))
        if (amount <= 0) { throw('error'); }

        if (web3.currentProvider.networkVersion === '42') {

            let metaMaskAccount = web3.eth.accounts[0] 
                ? web3.eth.accounts[0]
                : '0x8808c4E990369293375BA5e0e5B8cB6f113e5E5e';

            web3.eth.contract(wETH_ABI).at(wETH_kADD).deposit({
                from: metaMaskAccount,
                value: web3.toWei(amount)
            }, function (e, r) {
                // If there are no errors detected
                if (!e) {
                    // Accessing the return variable 'r' for the data structure that's returned
                    console.log(r);
                }
            }.bind(this));

            web3.eth.getBalance(web3.eth.coinbase, function(e, r) {
                if (!e) {
                    this.setState({
                        ETH: (web3.fromWei(r)).toFixed(2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    });
                }
            }.bind(this));
        } else {
            throw('error: not kovan');
        }
    }

    handleConvertWETH = (amount) => {
        // console.log('Amount:', amount);
        // console.log('Amount to Wei:', web3.toWei(amount))
        if (amount <= 0) { throw('error'); }

        if (web3.currentProvider.networkVersion === '42') {

            let metaMaskAccount = web3.eth.accounts[0] 
                ? web3.eth.accounts[0]
                : '0x8808c4E990369293375BA5e0e5B8cB6f113e5E5e';

            web3.eth.contract(wETH_ABI).at(wETH_kADD).withdraw(web3.toWei(amount), {
                from: metaMaskAccount
            }, function (e, r) {
                // If there are no errors detected
                if (!e) {
                    // Accessing the return variable 'r' for the data structure that's returned
                    console.log(r);
                }
            }.bind(this));

            web3.eth.getBalance(web3.eth.coinbase, function(e, r) {
                if (!e) {
                    this.setState({
                        ETH: (web3.fromWei(r)).toFixed(2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    });
                }
            }.bind(this));
        } else {
            throw('error: not kovan');
        }
    }


    render() {

        const { wETH, ETH, preETH, preWETH } = this.state;

        return(
            <div>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Header inverted>
                                {ETH}
                                <Header.Subheader>
                                    ETH Balance
                                </Header.Subheader>
                            </Header>
                            <Header inverted>
                                {wETH}
                                <Header.Subheader>
                                    wETH Balance
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            
                            <Input 
                                name='preETH' 
                                value={preETH} 
                                placeholder='Enter amount...' 
                                type={'number'}
                                onChange={this.handleChange}
                                fluid/>

                            <br/>
                            <Button fluid inverted color={'blue'} onClick={() => { this.handleConvertETH(preETH) }}>
                                <Icon name={'recycle'}/> Convert ETH -> wETH
                            </Button>
                            <br/>
                            <br/>
                            <br/>

                        </Grid.Column>
                        <Grid.Column width={5}>

                            <Input 
                                name='preWETH' 
                                value={preWETH} 
                                type={'number'}
                                placeholder='Enter amount...'
                                onChange={this.handleChange}
                                fluid/>
                                
                            <br/>
                            <Button fluid inverted color={'blue'} onClick={() => { this.handleConvertWETH(preWETH) }}>
                                <Icon name={'recycle'}/> Convert wETH -> ETH
                            </Button>
                            <br/>
                            <br/>
                            <br/>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}