import { Component, OnInit } from '@angular/core';
import { parseNumber } from '@progress/kendo-angular-intl';
import { CustomerService } from '../_services/customer.service';
import { UserlistService } from '../_services/userlist.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styles: [
  ]
})
export class UserlistComponent implements OnInit {

  userList=[]
  public usersGridSettings = {

    columnsConfig: [{
      field: 'fullName',
      title: 'name',
      width: 100
    },
    {
      field: 'email',
      title: 'email',
      width: 200
    },
    {
      field: 'status',
      title: 'status',
      width: 100
    },
    {
      field: 'delete',
      title: 'delete',
      width: 50
    },

    ],

  };

  constructor(private customerService:CustomerService, private userlistService:UserlistService) { }

  ngOnInit(): void {
    const params = {
      customerId : this.customerService.customerData.id
    }
    console.log(this.customerService.customerData.id);
    this.userlistService.listAsync(params).subscribe((res)=>{
      this.userList =  res.items
    });

  }
delete(delId:string){
  
  this.userlistService.deleteAsync(delId).subscribe((res)=>{
    const params = {
      customerId : this.customerService.customerData.id
    }
    this.userlistService.listAsync(params).subscribe((res)=>{
      this.userList =  res.items
    })
  })
  
}
 
}
