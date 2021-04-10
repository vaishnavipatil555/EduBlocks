<h1 align="center">Hack36 - The Invincible Squad </h1>
<p align="center">
</p>

<a href="https://hack36.com"> <img src="http://bit.ly/BuiltAtHack36" height=20px> </a>

# EduBlocks

## Introduction:
### Whats the problem?

There is no single place for storing educational certificates digitally which is safe, secure, tamper-proof and acceptable everywhere.
### Solution

EduBlocks is a DApp for organisations, educational institutes and students based on ethereum blockchain where educational institutions can grant degree certificates and marksheets to students. These certificates are given to students and a hash of that file is maintained on the blockchain such that any tampering to certificate will be detected with ease. Students can further share these records to organisations like private companies, government, banks and anywhere which asks for education proof.


## Table of contents
* [General Information](#general-information)
* [Technologies](#technologies)
* [Installing Dependencies](#installing-dependencies)
* [Dependencies version](#dependencies-version)
* [Steps to run](#steps-to-run)
* [Usecase Diagram](#usecase-diagram)
* [Flow Diagram](#flow-diagram)
* [System Design](#system-design)
* [Contributors](#contributors)

## General Information

Our solution is build on Ethereum Decentralised Applications (DApps) using Truffle suite, Metamask and Web3js.

## Technologies
* NPM
* Node
* Truffle
* Ganache
* Solidity
* Metamask
* React js
* Css

## Installing Dependencies

> npm
```
 $ sudo apt-get install npm
```
> node
```
$ npm install -g node
```
> truffle
```
$ npm install -g truffle
```
> Download Ganache from https://www.trufflesuite.com/ganache

> Meta Mask chrome extension https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en

## Dependencies version:
```
$ npm -v 
```
> \>=6.14.5
```
$ node -v 
```
> \>=14.4.0
```
$ truffle -v
```
> \>=5.3.0

## Steps to run
* npm
```
$ npm install
$ npm dev run
```
or
```
$ npm i
$ npm dev run
```
http://localhost:3000 will open automatically in chrome
* Ganache
	* Open Ganache AppImage
	* Select Workspace
	or
  * Create New Workspace Ethereum
  * Add Project
  * Select truffle-config.js
  * Save Workspace
* Truffle
```
$ truffle migrate
```
or if you change smart contract
```
$ truffle migrate --reset
```
* Metamask:
  * Create account in MetaMask.
  * Add network HTTP://localhost:7545 (This is where Ganache is running)
  * Import accounts from ganache
  * connect it to localhost:3000
  ![Metamask](https://github.com/vaishnavipatil555/EduBlocks/blob/main/images/Metamask%20account%20configuration.png)
  ![Metamask](https://github.com/vaishnavipatil555/EduBlocks/blob/main/images/Metamask%20accounts%20connection.png)

## Usecase Diagram

 ![Usecase Diagram](https://github.com/vaishnavipatil555/EduBlocks/blob/main/images/Diagrams/Usecase_Diagram_EduBlocks.png)

## Flow Diagram

 ![Flow Diagram](https://github.com/vaishnavipatil555/EduBlocks/blob/main/images/Diagrams/Flow_Diagram_EduBlocks.png)

## System Design

 ![System Design](https://github.com/vaishnavipatil555/EduBlocks/blob/main/images/Diagrams/System_Design_EduBlocks.png)
 
## Other resources
[PPT](https://drive.google.com/file/d/10cr3bjG1-4JOPgth2I1oWoI7-pleHNXH/view)

## Contributors:

Team Name: The Invincible Squad

* [Vaishnavi Patil](https://github.com/vaishnavipatil555)
* [Pradnya Navale](https://github.com/pradnyanavale200)
* [Akanksha Mahajan](https://github.com/akankshamahajan99)
* [Falguni Patil](https://github.com/Falguni99)

<a href="https://hack36.com"> <img src="http://bit.ly/BuiltAtHack36" height=20px> </a>
