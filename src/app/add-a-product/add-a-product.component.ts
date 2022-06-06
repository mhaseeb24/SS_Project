import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { MetamaskService } from '../metamask.service';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { from } from 'rxjs';

declare let require: any;
const artifacts = require('../../../build/contracts/SupplyChain.json');

@Component({
  selector: 'app-add-a-product',
  templateUrl: './add-a-product.component.html',
  styleUrls: ['./add-a-product.component.css'],
  providers: [CommonService]
})
export class AddAProductComponent implements OnInit {

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

  add_product_wrapper(myForm)
  {
    this.add_product(myForm.id, myForm.safranal_content, myForm.grade);
  }

  

  async add_product(id,safranal_content,grade) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.add_product.sendTransaction(1,90,"A",10, {from: "0xcb650519e26806E465cE10EdAAF3E8B85ebF8E7E"});
    } catch (e) {
      console.log(e);
    }
  }

}
