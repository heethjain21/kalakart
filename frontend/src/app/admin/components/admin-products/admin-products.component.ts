import { Product } from '../../../shared/models/product';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  headerData = {};
  categories$;
  categories;

  constructor(private productService: ProductService, private categoryService: CategoryService) {

    this.headerData['title'] = "Manage Products";
    this.headerData['description'] = "All the products in the company at one place.";
    this.headerData['imageUrl'] = "banner2.jpg";
    this.headerData['height'] = "300";

    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });

    this.categories$ = categoryService.getAll();
    this.categories$.subscribe(val => this.categories = val);
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  getCategoryName(categoryId) {
    for (let category of this.categories) {
      if (category['$key'] === categoryId)
        return category['name'];
    }
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  filter(query: string) {
    let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
