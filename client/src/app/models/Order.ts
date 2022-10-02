export interface Order {
    id:              number;
    buyerId:         string;
    shippingAddress: ShippingAddress;
    orderDate:       string;
    orderItems:      OrderItem[];
    subtotal:        number;
    deliveryFee:     number;
    orderStatus:     string;
    total:           number;
}

export interface OrderItem {
    productId:  number;
    name:       Name;
    pictureUrl: PictureURL;
    price:      number;
    quantity:   number;
}

export enum Name {
    AngularBlueBoots = "Angular Blue Boots",
    AngularPurpleBoots = "Angular Purple Boots",
    AngularSpeedsterBoard2000 = "Angular Speedster Board 2000",
}

export enum PictureURL {
    ImagesProductsBootAng1PNG = "/images/products/boot-ang1.png",
    ImagesProductsBootAng2PNG = "/images/products/boot-ang2.png",
    ImagesProductsSbAng1PNG = "/images/products/sb-ang1.png",
}

export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city:     string;
    state:    string;
    zip:      string;
    country:  string;
}
