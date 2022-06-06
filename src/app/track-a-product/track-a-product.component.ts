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
  selector: 'app-track-a-product',
  templateUrl: './track-a-product.component.html',
  styleUrls: ['./track-a-product.component.css'],
  providers: [CommonService]
})
export class TrackAProductComponent implements OnInit {
  accounts: string[];
  supply_chain_contract: any;
  model = {
    amount: 5,
    receiver: '',
    balance: 0,
    account: ''
  };

  constructor(private router: Router, public commonService: CommonService, public metamask: MetamaskService, private web3Service: Web3Service, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.metamask.watchAccount();
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  track_product(myForm)
  {
    this.check_product(myForm.id);
  }

  async check_product(id) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const product = await deployed_contract.product_list.call(1);
      console.log(`Product ID: ${product.id.toString()}
      Safranal_content: ${product.safranal_content.toString()}
      Grade: ${product.grade.toString()}
      Current Owner: ${product.Current_owner}
      Farmer Address: ${product.farmer}
      Distributor Address: ${product.distributor}
      Retailer Address: ${product.retailer}
      Consumer Address: ${product.consumer}
      Product State: ${product.state.toString()}
      Product Price: ${product.price.toString()}
      Product Price type: ${parseInt(product.price)}`);
    } catch (e) {
      console.log(e);
    }
  }

  async verify_product(id, safranal_content: Number) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const verification = await deployed_contract.get_response_from_verifiers.sendTransaction(1,10, {from: "0xE67c568243321181ad0034Fe59e7C7424FD0722F"});
      console.log(verification);
  }
  catch(e){
    console.log(e);
  }
}
}
