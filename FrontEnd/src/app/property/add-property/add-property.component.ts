import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Dublex'];
  furnishTypes: Array<string> = ['Full', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null
  };

  nextClicked: boolean;
  addPropertyForm: FormGroup;
  cityList: any[];
  property = new Property();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) { }

  public ngOnInit(): void {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data => {
      this.cityList = data;
    });
  }

  public CreateAddPropertyForm(): void {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }

  public get BasicInfo(): FormGroup {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  public get PriceInfo(): FormGroup {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  public get AddressInfo(): FormGroup {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  public get OtherInfo(): FormGroup {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }

  public get SellRent(): FormControl {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  public get BHK(): FormControl {
    return this.BasicInfo.controls.BHK as FormControl;
  }

  public get PType(): FormControl {
    return this.BasicInfo.controls.PType as FormControl;
  }

  public get FType(): FormControl {
    return this.BasicInfo.controls.FType as FormControl;
  }

  public get Name(): FormControl {
    return this.BasicInfo.controls.Name as FormControl;
  }

  public get City(): FormControl {
    return this.BasicInfo.controls.City as FormControl;
  }

  public get Price(): FormControl {
    return this.PriceInfo.controls.Price as FormControl;
  }

  public get BuiltArea(): FormControl {
    return this.PriceInfo.controls.BuiltArea as FormControl;
  }

  public get CarpetArea(): FormControl {
    return this.PriceInfo.controls.CarpetArea as FormControl;
  }

  public get Security(): FormControl {
    return this.PriceInfo.controls.Security as FormControl;
  }

  public get Maintenance(): FormControl {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  public get FloorNo(): FormControl {
    return this.AddressInfo.controls.FloorNo as FormControl;
  }

  public get TotalFloor(): FormControl {
    return this.AddressInfo.controls.TotalFloor as FormControl;
  }

  public get Address(): FormControl {
    return this.AddressInfo.controls.Address as FormControl;
  }

  public get LandMark(): FormControl {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  public get RTM(): FormControl {
    return this.OtherInfo.controls.RTM as FormControl;
  }

  public get PossessionOn(): FormControl {
    return this.OtherInfo.controls.PossessionOn as FormControl;
  }

  public get AOP(): FormControl {
    return this.OtherInfo.controls.AOP as FormControl;
  }

  public get Gated(): FormControl {
    return this.OtherInfo.controls.Gated as FormControl;
  }

  public get MainEntrance(): FormControl {
    return this.OtherInfo.controls.MainEntrance as FormControl;
  }

  public get Description(): FormControl {
    return this.OtherInfo.controls.Description as FormControl;
  }

  public onBack(): void {
    this.router.navigate(['/']);
  }

  public onSubmit(): void {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }


    } else {
      this.alertify.error('Please review the form and provide all valid entries');
    }
  }

  public allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  public selectTab(NextTabId: number, IsCurrentTabValid: boolean): void {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }

}
