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
  selector: 'app-sell-to-retailer',
  templateUrl: './sell-to-retailer.component.html',
  styleUrls: ['./sell-to-retailer.component.css']
})
export class SellToRetailerComponent implements OnInit {
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
    let new_price = myForm.value.new_price;
    id = parseInt(id);
    new_price = new_price.toString();
    this.buy_product_util(id, new_price);
  }

  async buy_product_util(id: Number, new_price)
  {
    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const product_details = await deployed_contract.product_list.call(id);
      let curr_owner = product_details.Current_owner.toString();
      let price = product_details.price.toString();
      let _id = product_details.id.toString();
      _id = parseInt(_id);
      price = parseInt(price);
      const product = await deployed_contract.sell_to_retailer.sendTransaction(_id, BigInt(new_price), {from: this.metamask.model.account,value: price});
      console.log(`Product has been purchased}
      `);
      let tx = {id: id.toString(), sender: product.receipt.from.toString(), receiver: curr_owner, hash: product.receipt.transactionHash.toString(), amount: price.toString()};
      this.store_tx(tx);
    } catch (e) {
      console.log(e);
    }
  }

  store_tx(tx)
  {
    this.commonService.store_transaction(tx).subscribe((res) => {console.log('added to data-base')});
  }


}
