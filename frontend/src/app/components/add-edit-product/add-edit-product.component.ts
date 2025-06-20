import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService
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
      nombre_productos: this.form.value.name,
      codigo_productos: this.form.value.code,
      descp_productos: this.form.value.desc,
      stock_productos: this.form.value.cantidad,
      precio_venta: this.form.value.pV,
      precio_compra: this.form.value.pC,
      marca_productos: this.form.value.Marca
    }
    this.loading = true;
    this._productService.saveProduct(product).subscribe(()=>{
      this.loading = false;
      this.toastr.success(`El producto ${product.nombre_productos} fue registrado con éxito`, 'Producto registrado');
      this.router.navigate(['/']);
    })
    }
    
  }

