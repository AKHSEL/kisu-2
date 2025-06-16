import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private _productService: ProductService
  ){
    this.form = this.fb.group({
      code:[null, Validators.required],
      name:['', Validators.required],
      desc:['', Validators.required],
      cantidad:[null, Validators.required],
      pV:[null, Validators.required],
      pC:[null, Validators.required],
      Marca:['', Validators.required]
    })
  }
  addProduct(){
    const product:Product = {
      name: this.form.value.name,
      code: this.form.value.code,
      description: this.form.value.desc,
      stock: this.form.value.cantidad,
      precioV: this.form.value.pV,
      precioC: this.form.value.pC,
      marca: this.form.value.Marca
    }
    this._productService.saveProduct(product).subscribe(()=>{
      console.log('producto agregado')
    })
    }
    
  }

