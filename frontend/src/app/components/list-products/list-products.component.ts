import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog'
import {AdModalComponent} from '../../shared/ad-modal/ad-modal.component'


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [RouterModule, ProgressBarComponent, CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{
  listProduct: Product [] = []
  loading: boolean = false;
  

constructor(private _productoService: ProductService, private toastr: ToastrService, private dialog: MatDialog){
  
}
ngOnInit(): void {
this.getListProducts();
}

getListProducts(){

  this.loading = true;
     this._productoService.getListProducts().subscribe((data)=>{
    this.listProduct = data;
    this.loading = false;
  })
}
confirmarEliminar(id:number){
 const dialogRef = this.dialog.open(AdModalComponent, {
  data: { mensaje: '¿Estás seguro de eliminar el producto?' }
});
dialogRef.afterClosed().subscribe(result => {
  if (result) {
    this.deleteProduct(id);
  }
});

}
deleteProduct(id:number){
  this.loading = true;
  this._productoService.deleteProduct(id).subscribe(()=>{
    this.loading = false;
    this.getListProducts();
    this.toastr.warning('El producto fue eliminado correctamente', 'Producto eliminado')
  })
}

}
