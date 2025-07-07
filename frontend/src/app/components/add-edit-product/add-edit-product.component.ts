import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog'
import {AdModalComponent} from '../../shared/ad-modal/ad-modal.component'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar'

  formFields = [
    { name: 'code', label: 'Código', type: 'text', col: 6 },
    { name: 'name', label: 'Nombre', type: 'text', col: 6 },
    { name: 'desc', label: 'Descripción', type: 'text', col: 6 },
    { name: 'cantidad', label: 'Cantidad', type: 'number', col: 6 },
    { name: 'pV', label: 'Precio Venta', type: 'number', col: 6 },
    { name: 'pC', label: 'Precio Compra', type: 'number', col: 6 },
    { name: 'marca', label: 'Marca', type: 'text', col: 6 },
  ];

  constructor(
    private fb: FormBuilder,
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      code:[null, Validators.required],
      name:['', Validators.required],
      desc:['', Validators.required],
      cantidad:[null, Validators.required],
      pV:[null, Validators.required],
      pC:[null, Validators.required],
      Marca:['', Validators.required]
    });

    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit():void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.getProduct(this.id);
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this._productService.getProduct(id).subscribe((data:Product) => {
      this.loading = false;
      this.form.setValue({
        code: data.codigo_productos,
        name: data.nombre_productos,
        desc: data.descp_productos,
        cantidad: data.stock_productos,
        pV: data.precio_venta,
        pC: data.precio_compra,
        Marca: data.marca_productos
      });
    });
  }

confirmarGuardar() {
  const dialogRef = this.dialog.open(AdModalComponent, {
    data: { mensaje: `¿Estás seguro de ${this.operacion.toLocaleLowerCase()} este producto?` }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.addProduct();
    }
  });
}


  addProduct(){
    const product: Product = {
      nombre_productos: this.form.value.name,
      codigo_productos: this.form.value.code,
      descp_productos: this.form.value.desc,
      stock_productos: this.form.value.cantidad,
      precio_venta: this.form.value.pV,
      precio_compra: this.form.value.pC,
      marca_productos: this.form.value.Marca
    };

    this.loading = true;

    if (this.id !== 0) {
      product.id_productos = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.nombre_productos} fue actualizado con éxito`, 'Producto actualizado');
        this.router.navigate(['/']);
      });
    } else {
      this._productService.saveProduct(product).subscribe(()=>{
      this.loading = false;
      this.toastr.success(`El producto ${product.nombre_productos} fue registrado con éxito`, 'Producto registrado');
      this.router.navigate(['/']);
    })
      }
    }
  }

