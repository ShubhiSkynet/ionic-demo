import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add',
  templateUrl: 'add.page.html',
  styleUrls: ['add.page.scss']
})
export class AddPage {

  productForm: FormGroup;
  prod_name:string='';
  prod_desc:string='';
  prod_price:number=null;

  constructor(public api: ApiService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private storage: Storage) {
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });
  }

  async onFormSubmit(form:NgForm) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();
    await this.api.addProduct(form)
      .subscribe(res => {
          let id = res['id'];
          loading.dismiss();
          this.router.navigate([{ detail: id }]);
        }, (err) => {
          console.log(err);
          loading.dismiss();
        });
  }

}