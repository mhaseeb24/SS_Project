import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { MetamaskService } from '../metamask.service';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const artifacts = require('../../../build/contracts/SupplyChain.json');

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [CommonService]
})
export class SignupComponent implements OnInit {

  accounts: string[];
  supply_chain_contract: any;
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private router: Router, public commonService: CommonService, public metamask: MetamaskService, private web3Service: Web3Service, private matSnackBar: MatSnackBar) {
  }


    ngOnInit(): void {
    this.metamask.watchAccount();
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  async watchAccount() {
    await this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      console.log(`hello this is ${this.model.account}`);
    });
  }

  async register_Farmer(add) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addFarmer.sendTransaction(add, {from: add});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Distributor(add) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addDistributor.sendTransaction(add, {from: add});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Retailer(add) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addRetailer.sendTransaction(add, {from: add});
    } catch (e) {
      console.log(e);
    }
  }

  async register_Consumer(add) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.addConsumer.sendTransaction(add, {from: add});
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




  // Add user to the database

  async addUser(formObj: NgForm) {
    //this.metamask.watchAccount();
    let role: any;
    role = document.getElementById("role");
    let x = role.value;
    this.commonService.selectedUser.role = x;
    console.log(x);
    this.commonService.selectedUser.address =  this.metamask.model.account;
    let add = this.commonService.selectedUser.address;

    console.log(`address is : ${this.metamask.model.account}`);
    this.commonService.createUser(this.commonService.selectedUser).subscribe((res) => {
      console.log('User added to database');
      if(x == 'Farmer')
      {
        this.register_Farmer(add);
      }

      if(x == 'Distributor')
      {
        this.register_Distributor(add);
      }

      if(x == 'Retailer')
      {
        this.register_Retailer(add);
      }

      if(x == 'Consumer')
      {
        this.register_Consumer(add);
      }
        this.router.navigateByUrl('/login');
      
    })
  }
}
  


