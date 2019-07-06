# Wetherapp Tutorial | OSX LINUX 
Learn how to quickly build a Javascript app in less than 4 hours to build your own wETH to ETH Conversion App by interfacing directly with the smart contract! Some tools you will use include Meteor and ReactJS

#### What you’ll learn
* Blockchain 
* Solidity
* Ethereum
* Javascript
* ReactJS

# Specifications
Install Meteor framework and have a basic understanding of Solidity and Javascript. 

### Who is this for?
* Slightly experienced dApp developers (or beginner’s looking for a challenge) 

# Setup Guide 
Open a command prompt and proceed with the following steps. 
### Install Meteor 
> curl https://install.meteor.com/ | sh
### Create Project Directory (Optional) 
> mkdir Projects && mkdir Projects/wetherapp
### Create Meteor App 
> meteor create wetherapp
### Install CSS Post Processor / Replace standard-minifier with juliancwirko:postcss  
> meteor remove standard-minifier-css 
> meteor add juliancwirko:postcss
### Install Libraries via Meteor 
> meteor add semantic:ui juliancwirko:postcss less jquery ethereum:web3 kadira:flow-router tracker session
### Install Meteor npm Libraries  
> meteor npm install --save postcss postcss-load-config react react-dom react-mounter semantic-ui-react
### Run Meteor App 
> meteor

