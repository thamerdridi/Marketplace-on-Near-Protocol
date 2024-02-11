import { Product, ListOfProducts } from './Product';
import { ContractPromiseBatch, context } from 'near-sdk-as';

export function setProduct (product: Product): void {
    let id = ListOfProducts.get(product.id);
    if (id!== null){
        throw new Error ('the product already exists');
    } 
    else {
        ListOfProducts.set(product.id, Product.fromPayload(product));
    }
    
}

export function getProduct(id: string): Product | null{
    if (ListOfProducts.get(id)){
        return ListOfProducts.get(id);
    }
    else{
        throw new Error ("product doesn't exist");
    };
}

export function getProducts(): Product[] {
    return ListOfProducts.values();
}


export function buyProduct(ID: string): void{
    const product = getProduct(ID);
    if (product == null) {
        throw new Error("product not found");
    }
    if (product.price.toString() != context.attachedDeposit.toString()) {
        throw new Error("attached deposit should equal to the product's price");
    }
    ContractPromiseBatch.create(product.EuphoriaSafe).transfer(context.attachedDeposit);
    product.incrementnSoldAmount();
    ListOfProducts.set(product.id, product);
}
