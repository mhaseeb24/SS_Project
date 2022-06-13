import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { MetamaskService } from '../metamask.service';
import {Web3Service} from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { from } from 'rxjs';
const Web3 = require('web3');


declare let require: any;
const artifacts = require('../../../build/contracts/SupplyChain.json');

@Component({
  selector: 'app-buy-a-product',
  templateUrl: './buy-a-product.component.html',
  styleUrls: ['./buy-a-product.component.css'],
  providers: [CommonService]
})
export class BuyAProductComponent implements OnInit {
  accounts: string[];
  _add: any;
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
    this._add = this.metamask.model.account;
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

  buy_product(myForm)
  {
    let id = myForm.value.Product_ID;
    id = parseInt(id);
    this.buy_product_util(id);
  }

  async buy_product_util(id: Number)
  {
    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const product_details = await deployed_contract.product_list.call(id);
      let price = product_details.price.toString();
      let _id = product_details.id.toString();
      _id = parseInt(_id);
      price = parseInt(price);
      const product = await deployed_contract.sell_to_consumer.sendTransaction(_id,{from: this.metamask.model.account});
      console.log(`Product has been purchased}
      `);
      
      let tx = {id: id.toString(), sender: product.receipt.from.toString(), receiver: product.receipt.to.toString(), hash: product.receipt.transactionHash.toString(), amount: price.toString()};
      this.store_tx(tx);
      console.log(product);
    } catch (e) {
      console.log(e);
    }
  }

  store_tx(tx)
  {
    this.commonService.store_transaction(tx).subscribe((res) => {console.log('added to data-base')});
  }

}
