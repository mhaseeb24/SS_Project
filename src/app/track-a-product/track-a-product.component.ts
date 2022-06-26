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
    // this.setProductDiv()
    this.metamask.watchAccount();
    //this._add = this.metamask.model.account; 
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

  async show_history_wrapper(myForm: NgForm) {
    try {
      const div = document.getElementById('div');
      div.remove();
    } catch (e) {
      console.log(e);
    }
    this.show_loading();
    let id = (((myForm.value.Product_ID)));
    setTimeout(() => {
      this.get_tx(myForm);
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


  async verify_product(myForm) {
    // const person = this.model.account;
    // console.log(`person address is ${person}`);

    //console.log('Sending coins' + amount + ' to ' + receiver);
    let id = parseInt(myForm.value.Product_ID);
    //let safranal_content = parseInt(myForm.value.safranal_content);

    try {
      const deployed_contract = await this.supply_chain_contract.deployed();
      const verification = await deployed_contract.get_response_from_verifiers.sendTransaction(id, 10, { from: this.metamask.model.account });
      console.log(verification);
    }
    catch (e) {
      console.log(e);
    }
  }

  async show_loading() {
    const div = document.createElement('div');
    // const div = document.getElementById('loader');
    div.className = 'spinner-border text-danger';
    div.style.marginTop = '10px';
    div.style.marginLeft = '100px';
    div.innerHTML = `<center><span class="sr-only"></span>
  </center>`
    document.getElementById('loader').appendChild(div);
    return new Promise(done => setTimeout(() => {
      div.remove();
    }, 2000)).then(() => { });
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

    // const main = document.getElementById('main-content');
    // main.style.height = '120vh';

    div.className = 'row';
    div.style.marginTop = '10px'

    div.innerHTML = `
    <center><table class="table">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Safranal Content</th>
        <th>Grade</th>
        <th>Current Owner</th>
        <th>Farmer Address</th>
        <th>Farmer Rating</th>
        <th>Distributor Address</th>
        <th>Distributor Rating</th>
        <th>Retailer Address</th>
        <th>Retailer Rating</th>
        <th>Consumer Address</th>
        <th>Product State</th>
        <th>Product Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${id}</td>
        <td>${saf}</td>
        <td>${grade}</td>
        <td>${curr_name}</td>
        <td>${f_name}</td>
        <td>${f_score}</td>
        <td>${d_name}</td>
        <td>${d_score}</td>
        <td>${r_name}</td>
        <td>${r_score}</td>
        <td>${c_name}</td>
        <td>${state}</td>
        <td>${price}</td>
      </tr>
    </tbody>
  </table>
  </center>
  `;

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
    this.commonService.get_transaction(id).subscribe((res) => {
  //     setTimeout(() => {
      
  //     let div;
  
  //     div = document.createElement('div');
  //     div.setAttribute("id", "div");
  
  //     // const main = document.getElementById('main-content');
  //     // main.style.height = '120vh';
  
  //     div.className = 'row';
  //     div.style.marginTop = '10px'
  
  //     div.innerHTML = `
  //     <center><table class="table"  id = "table">
  //     <thead>
  //       <tr>
  //         <th>Product ID</th>
  //         <th>Sendor</th>
  //         <th>Reciever</th>
  //         <th>Tx Hash</th>
  //         <th>Amount</th>
  //       </tr>
  //     </thead>
  //   </table>
  //   </center>
  //   `;
  //   console.log(res[0])
  //   for (var row = 0; row < res[0].length; row++) {
  //     tr = document.createElement('tr');
  //     for (cell = 0; cell < 22; cell++) {
  //         td = document.createElement('td');
  //         tr.appendChild(td);
  //         td.innerHTML = row * 22 + cell + 1;
  //     }
  //     table.appendChild(tr);
  // }
  // document.getElementById('container').appendChild(table);
  //     document.getElementById('spg').appendChild(div);}, 1100);
    console.log(res)});


    
  }

  setProductDiv(){

    let div;

    div = document.createElement('div');
    div.setAttribute("id", "div");

    div.className = 'row';
    div.style.marginTop = '10px'

    div.innerHTML = `
    <center><table class="table">
    <thead>
      <tr>
        <th>Product ID</th>
        <th>Safranal Content</th>
        <th>Grade</th>
        <th>Current Owner</th>
        <th>Farmer Address</th>
        <th>Farmer Rating</th>
        <th>Distributor Address</th>
        <th>Distributor Rating</th>
        <th>Retailer Address</th>
        <th>Retailer Rating</th>
        <th>Consumer Address</th>
        <th>Product State</th>
        <th>Product Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>Current Name</td>
        <td>Farmer Name</td>
        <td>1</td>
        <td>Dis Name</td>
        <td>1</td>
        <td>Ret Name</td>
        <td>1</td>
        <td>Cus Name</td>
        <td>MH</td>
        <td>123</td>
      </tr>
    </tbody>
  </table>
  </center>
  `;

    document.getElementById('spg').appendChild(div);
    this.metamask.watchAccount();
    this.web3Service.artifactsToContract(artifacts)
      .then((contract_instance) => {
        this.supply_chain_contract = contract_instance;
        this.supply_chain_contract.deployed().then(deployed => {
          console.log(deployed);
        });
      });
  }

 
}
