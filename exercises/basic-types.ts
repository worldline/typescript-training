// Add type annotations for all variables and functions in the code above.

const productCategories = new Set(["fruit", "vegetable", "meat"])

class Product {
    constructor(ref, categories, price) {
        this.ref = ref
        this.categories = categories
        this.price = price
    }
}

const apple = new Product("apple", ["fruit"], 0.25)
const tomato = new Product("tomato", ["fruit", "vegetable"], 0.15)
const beef = new Product("beef", ["meat"], 3.50)

const productCatalog = [apple, tomato, beef]

const user = {
    name: 'Alice',
    role: "customer",  // only value accepted is "customer"
    basket: {
        apple: 6,
        tomato: 2
    }
}

function getTotalPrice(user) {
    return Object.keys(user.basket).reduce((total, ref) => {
        const product = productCatalog.find(p => p.ref === ref)
        const quantity = user.basket[ref]
        return total + product.price * quantity
    }, 0)
}

console.log("Total:", getTotalPrice(user))