import { User } from "./user.model"

export class OurItem {
    public name: string
    public description: string
    public price: number
    public imgUrl: string
    public category: string



    constructor(name: string, description: string, price: number, imgUrl: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}