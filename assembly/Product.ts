import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Product{
    id: string;
    name: string;
    description: string;
    image: string;
    location: string;
    price: u128;
    EuphoriaSafe: string;
    numberSold: u32;
    public static fromPayload(payload: Product): Product {
        const product = new Product();
        product.id = payload.id;
        product.name = payload.name;
        product.description = payload.description;
        product.price = payload.price;
        product.image = payload.image;
        product.location = payload.location;
        product.EuphoriaSafe=context.sender;
        return product;
    }

    public incrementnSoldAmount(): void {
        this.numberSold = this.numberSold + 1;}
    
}
export const ListOfProducts = new PersistentUnorderedMap<string, Product>("List_Of_Products");