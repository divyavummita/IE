import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { CustomerService } from '../_services/customer.service';
import { InstitutionService } from '../_services/institution.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {
  
  constructor(
    public authService: AuthService, private _institution : InstitutionService, private _cus : CustomerService
  ) { }
  ngOnInit(): void {
    const params = {
      customerId : this._cus.customerData.id
    }
    this._institution.listAsync(params).subscribe((res)=>{
      this.institutionList =  res.items
    });
  }
  institutionList=[]

  public institutionGridSettings = {
   
    columnsConfig: [{
        field: 'img',
        title: 'Logo',
        width: 30,
    },
    {
        field: 'created',
        title: 'created',
        width: 50
    },
    {
        field: 'name',
        title: 'name',
        width: 100
    },
    {
        field: 'city',
        title: 'city',
        width: 50
    },
    {
        field: 'active',
        title: 'status',
        width: 50
    },
    {
        field: 'delete',
        title: 'Delete',
        width: 20
    }
    ],
 
};

}

