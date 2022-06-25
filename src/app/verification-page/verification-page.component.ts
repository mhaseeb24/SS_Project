import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { MetamaskService } from '../metamask.service';
import { Web3Service } from '../util/web3.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../shared/user.model';
import { from } from 'rxjs';

declare let require: any;
const artifacts = require('../../../build/contracts/SupplyChain.json');

@Component({
  selector: 'app-verification-page',
  templateUrl: './verification-page.component.html',
  styleUrls: ['./verification-page.component.css'],
  providers: [CommonService]
})
export class VerificationPageComponent implements OnInit {
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

  async get_response_from_verifiers(myForm){
    let _id = myForm.value.Product_ID.toString();
    _id = parseInt(_id);
    let safranal_content = myForm.value.safranal_content.toString();
    safranal_content = parseInt(safranal_content);
    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const confirmation = await deployed_contract.get_response_from_verifiers.sendTransaction(_id, safranal_content, {from: this.metamask.model.account});
      //console.log(confirmation);
    }
    catch (e) {
      console.log(e);
    }

    try{
      const deployed_contract = await this.supply_chain_contract.deployed();
      const confirmation = await deployed_contract.flag.call((err, res) => {
        if(err)
        {
          console.log(err);
        }

        else
        {
          console.log(res);
          if(!!res){
            const success = document.getElementById("success-alert");
            success.style.display = 'block';
          }
          else{
            const err = document.getElementById("error-alert");
            err.style.display = 'block';
          }
        }
      });
    }
    catch(e)
    {
      console.log(e);
    }
  }
}
