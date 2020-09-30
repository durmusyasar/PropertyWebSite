import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: IPropertyBase[];
  Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';


  constructor(
    private housingService: HousingService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.properties = data;
      }, error => {
        console.log('httperror:');
        console.log(error);
      }
    );
  }

  public onCityFilter(): void {
    this.SearchCity = this.City;
  }

  public onCityFilterClear(): void {
    this.SearchCity = '';
    this.City = '';
  }

  public onSortDirection(): void {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}
