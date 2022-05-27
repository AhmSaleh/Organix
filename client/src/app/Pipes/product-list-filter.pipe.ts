import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../Interfaces/IProduct';

@Pipe({
  name: 'productListFilter',
})
export class ProductListFilterPipe implements PipeTransform {
  transform(productsLst: IProduct[], filterText: string): any {
    return productsLst
      ? productsLst.filter(
          (product) =>
            product.name.search(new RegExp(filterText, 'i')) > -1 ||
            product.shortDescription.search(new RegExp(filterText, 'i')) > -1 ||
            product.productInformation.search(new RegExp(filterText, 'i')) >
              -1 ||
            product.longDescription.search(new RegExp(filterText, 'i')) > -1
        )
      : [];
  }
}
