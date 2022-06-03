import { Component, OnInit } from '@angular/core';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const artifacts = require('../../../build/contracts/SupplyChain.json');

@Component({
  selector: 'app-supply-chain',
  templateUrl: './supply-chain.component.html',
  styleUrls: ['./supply-chain.component.css']
})
export class SupplyChainComponent implements OnInit {
  accounts: string[];
  supply_chain_contract: any;
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });

  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
    });
  }

  async register_Farmer() {
    const person = this.model.account;
    console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addFarmer.sendTransaction(person, {from: person});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Distributor() {
    const person = this.model.account;
    console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addDistributor.sendTransaction(person, {from: person});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Retailer() {
    const person = this.model.account;
    console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addRetailer.sendTransaction(person, {from: person});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Consumer() {
    const person = this.model.account;
    console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addConsumer.sendTransaction(person, {from: person});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Verifier() {
    console.log('hello');
  }

  async add_product(id, grade, safranal_content) {
    this.watchAccount();
    const person = this.model.account;
    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.add_product.sendTransaction(id, safranal_content,grade, {from: person});
    } catch (e) {
      console.log(e);
    }
  }



}
