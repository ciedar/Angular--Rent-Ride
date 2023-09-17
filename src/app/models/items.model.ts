export class ItemModel {
    public name: string
    public itemDescription: string
    public imgUrl: string[]
    public price: number
    public owner: string
    public projectId?: string[]

    constructor(name: string, itemDescription: string, imgUrl: string[], price: number, owner: string) {
        this.name = name;
        this.itemDescription = itemDescription;
        this.imgUrl = imgUrl,
            this.price = price,
            this.owner = owner;
    }
}