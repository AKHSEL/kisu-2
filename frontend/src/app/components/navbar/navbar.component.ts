import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;
    listProduct: Product [] = []
  busqueda: string = ''
    constructor(private router: Router, private productService:ProductService,private toastr: ToastrService){

    }
      ngOnInit(){
        this.productService.getListProducts().subscribe((data)=>{
          this.listProduct=data
        })
      }

    buscarproducto() {
    const encontrado = this.listProduct.find(
      prod => prod.nombre_productos.toLowerCase().trim() === this.busqueda.toLowerCase().trim()
    );

    if (encontrado) {
      this.router.navigate(['/edit', encontrado.id_productos]);
                this.toastr.success('El producto se encuentra en sistema', 'Producto encontrado')

    } else {
          this.toastr.error('El producto NO se encuentra en sistema', 'Producto NO encontrado')
    }

    this.busqueda = ''; 
  }
}
