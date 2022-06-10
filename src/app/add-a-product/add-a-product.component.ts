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
  _add: any;
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
    this._add = this.metamask.model.account; 
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  add_product_wrapper(myForm: NgForm)
  {
    console.log(`address is : ${this.metamask.model.account}`);
    let id = ((parseInt(myForm.value.Product_ID)));
    let saf = ((parseInt(myForm.value.safranal_content)));
    let grade = ((myForm.value.Grade));
    let price = ((parseInt(myForm.value.price)));
    this.add_product(id, saf, grade,price);
    myForm.reset();
  }

  

  async add_product(id,safranal_content,grade,price) {
    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const transaction = await deployed_contract.add_product.sendTransaction(id,safranal_content,grade,price, {from: this.metamask.model.account});
      const success = document.getElementById("success-alert");
      success.style.display = 'block';
      setTimeout(() => {
        success.style.display = 'none';
      }, 3000);
    } catch (e) {
      console.log(e);
      const err = document.getElementById("error-alert");
      err.style.display = 'block';
      setTimeout(() => {
        err.style.display = 'none';
      }, 3000);
    }
  }

}
