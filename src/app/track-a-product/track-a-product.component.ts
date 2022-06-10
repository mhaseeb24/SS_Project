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

  async track_product(myForm: NgForm) {
    try {
      const div = document.getElementById('div');
      div.remove();
    } catch (e) {
      console.log(e);
    }
    this.show_loading();
    let id = ((parseInt(myForm.value.Product_ID)));
    setTimeout(() => {
      this.check_product(id);
    }, 2100);
  }

  async check_product(id) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const product = await deployed_contract.product_list.call(id);
      let _id = product.id.toString();
      // if (_id == '0') {
      //   document.getElementById('sss').innerText = "0";
      // }
      let _saf = product.safranal_content.toString();
      let _grade = product.grade.toString();
      let current_owner = product.Current_owner.toString();
      let farmer = product.farmer.toString();
      let distributor = product.distributor.toString();
      let retailer = product.retailer.toString();
      let consumer = product.consumer.toString();
      let state = product.state.toString();
      let price = product.price.toString()
      console.log(`Product ID: ${_id}
      Safranal_content: ${_saf}
      Grade: ${_grade}
      Current Owner: ${current_owner}
      Farmer Address: ${farmer}
      Distributor Address: ${distributor}
      Retailer Address: ${retailer}
      Consumer Address: ${consumer}
      Product State: ${state};
      Product Price: ${price}`);
      this.show_details(_id, _saf, _grade, current_owner, farmer, distributor, retailer, consumer, state, price);
    } catch (e) {
      console.log(e);
      const err = document.getElementById("error-alert");
      err.style.display = 'block';
      setTimeout(() => {
        err.style.display = 'none';
      }, 3000);
    }
  }


  async verify_product(id, safranal_content: Number) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const verification = await deployed_contract.get_response_from_verifiers.sendTransaction(1, 10, { from: "0xE67c568243321181ad0034Fe59e7C7424FD0722F" });
      console.log(verification);
    }
    catch (e) {
      console.log(e);
    }
  }

  async show_loading() {
    const div = document.createElement('div');
    div.className = 'spinner-border text-danger';
    div.style.marginTop = '10px';
    div.style.marginLeft = '100px';
    div.innerHTML = `<center><span class="sr-only"></span>
  </center>`
    document.getElementById('spg').appendChild(div);
    return new Promise(done => setTimeout(() => {
      div.remove();
    }, 2000)).then(() => { console.log('hellllll') });
  }

  async show_details(id, saf, grade, current_owner, farmer, distributor, retailer, consumer, state, price) {
    let f_score, d_score, r_score;
    let f_name, d_name, r_name, c_name, curr_name;
    this.commonService.selectedUser.address = farmer;
    this.commonService.get_name_from_address(this.commonService.selectedUser).subscribe((res) => {f_name = res;});
    this.commonService.selectedUser.address = distributor;
      this.commonService.get_name_from_address(this.commonService.selectedUser).subscribe((res) => {d_name = res});
      this.commonService.selectedUser.address = retailer;
      this.commonService.get_name_from_address(this.commonService.selectedUser).subscribe((res) => {r_name = res});
      this.commonService.selectedUser.address = current_owner;
      this.commonService.get_name_from_address(this.commonService.selectedUser).subscribe((res) => {curr_name = res});
      this.commonService.selectedUser.address = consumer;
      this.commonService.get_name_from_address(this.commonService.selectedUser).subscribe((res) => {c_name = res});

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      f_score = await deployed_contract.get_rep_score.call(farmer);
      d_score = await deployed_contract.get_rep_score.call(distributor);
      r_score = await deployed_contract.get_rep_score.call(retailer);
    } catch (e) { console.log(e) }
    setTimeout(() => {
      console.log(f_name);
    
    let div;

    div = document.createElement('div');
    div.setAttribute("id", "div");

    const main = document.getElementById('main-content');
    main.style.height = '120vh';

    div.className = 'row';
    div.style.marginTop = '10px'

    div.innerHTML = `
   <center> <h1 style = "color: olive"> Product Details </h1>
    <p class = "text-primary"> Product ID: ${id} </p> <br>
    <p class = "text-primary"> Safranal_content: ${saf} </p> <br>
    <p class = "text-primary"> Grade: ${grade} </p> <br>
    <p class = "text-danger"> Current Owner: ${curr_name} </p> <br>
    <p class = "text-info"> Farmer Address: ${f_name} (rated ${f_score}) </p> <br>
    <p class = "text-primary"> Distributor Address: ${d_name} (rated ${d_score}) </p><br>
    <p class = "text-primary"> Retailer Address: ${r_name} (rated ${r_score}) </p> <br>
    <p class = "text-primary"> Consumer Address: ${c_name} </p> <br>
    <p class = "text-primary"> Product State: ${state} </p> <br>
    <p class = "text-primary"> Product Price: ${price} </p> <br>
  </center>`;

    document.getElementById('spg').appendChild(div);}, 1100);
  }
  delay(n) {
    return new Promise(done => {
      setTimeout(() => {
      }, n);
    });
  }

  get_tx(myForm) {
    let id = myForm.value.Product_ID;
    this.commonService.get_transaction(id).subscribe((res) => {console.log(res[1])});
  }
}
