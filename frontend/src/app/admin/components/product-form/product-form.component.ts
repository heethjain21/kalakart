import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { Product } from 'shared/models/product';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  categories;
  product: Product;
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    categoryService: CategoryService,
    private productService: ProductService,
    private db: AngularFireDatabase) {

    this.categories$ = categoryService.getAll();
    this.categories$.subscribe(val => this.categories = val);

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != 'new') this.productService.get(this.id).take(1).subscribe(p => this.product = p);

  }

  save(product) {

    // Adding previewUrl inside product object to save it too
    product['previewUrl'] = this.product['previewUrl'];
    
    // for (let category of this.categories) {
    //   if (category['$key'] === product['category']) {
    //     console.log('matched at ', category);
    //     product['categories'] = category['name'];
    //   }
    // }

    console.log(product);

    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {

    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
    this.product['category'] = null;
  }

  convertImageUrlToPreviewUrl(e) {

    let imageUrl = this.product.imageUrl;

    let substringStart = imageUrl.indexOf('/file') + 8;
    let substringEnd = imageUrl.indexOf('/view');

    this.product['previewUrl'] = 'https://drive.google.com/uc?export=view&id=' + imageUrl.substring(substringStart, substringEnd);

  }

}
