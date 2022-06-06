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
  selector: 'app-buy-a-product',
  templateUrl: './buy-a-product.component.html',
  styleUrls: ['./buy-a-product.component.css'],
  providers: [CommonService]
})
export class BuyAProductComponent implements OnInit {
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

  buy_product(myForm)
  {
    this.buy_product_util(1);
  }

  async buy_product_util(id)
  {
    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const product = await deployed_contract.sell_to_consumer.sendTransaction(1, {from: "0x5226440179D90665f400242161D3da98a9CE7Ba9",value: 10});
      console.log(`Product has been purchased}
      `);
    } catch (e) {
      console.log(e);
    }
  }

}
