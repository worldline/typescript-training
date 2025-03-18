
class Product {
    ref: string
    categories: string[]
    price: number
    constructor(ref: string, categories: string[], price: number) {
        this.ref = ref
        this.categories = categories
        this.price = price
    }
}

const apple = new Product("apple", ["fruit"], 0.25)
const tomato = new Product("tomato", ["fruit", "vegetable"], 0.15)
const beef = new Product("beef", ["meat"], 3.50)

const productCatalog: Product[] = [apple, tomato, beef] as const

const user: {
    name: string
    type: "customer"
    basket: {
        [ref: string]: number
    }
} = {
    name: 'Alice',
    type: "customer", // only value accepted is "customer"
    basket: {
        apple: 6,
        tomato: 2
    }
}

function getTotalPrice(user: {
    name: string
    type: "customer"
    basket: {
        [ref: string]: number
    }
}): number {
    return Object.keys(user.basket).reduce((total, ref) => {
        const product = productCatalog.find(p => p.ref === ref)
        const quantity = user.basket[ref]
        if (!product) {
            throw new Error(`Product with ref ${ref} not found`)
        }
        return total + product.price * quantity
    }, 0)
}

console.log("Total:", getTotalPrice(user))