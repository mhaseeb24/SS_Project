import { Injectable } from '@angular/core';
import { Web3Service } from './util/web3.service';
import { MatSnackBar } from '@angular/material';

declare let require: any;
const artifacts = require('../../build/contracts/SupplyChain.json');

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  accounts: string[];
  supply_chain_contract: any;
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };


  constructor(private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.model.account = accounts[0];
      console.log(this.model.account);
    });
  }
}


