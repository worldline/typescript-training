/*
You're managing a pizza store that allows customers to customize their pizza when ordering it
A pizza can have several toppings on it.
The customer can choose three toppings among the 6 available options.
*/

type Topping = 'bacon' | 'cheese' | 'pepper' | 'mushrooms' | 'olives' | 'onions';

// Create a type Pizza that represents a pizza with exactly 3 toppings on it
type Pizza = [Topping, Topping, Topping];

// Create a utility type ToppingOfPizza that receives a Pizza type and 
// returns the union type representing one of the possible toppings of the pizza
type ToppingOfPizza<P extends Pizza> = P extends [infer T1, infer T2, infer T3] ? T1 | T2 | T3 : never;

type MyPizza = ['mushrooms', 'cheese', 'pepper'];
type MyToppings = ToppingOfPizza<MyPizza>; // expected to be 'mushrooms' | 'cheese' | 'pepper'


// Based on a list of toppings, return a type matching all the pizzas that can be made with these toppings
type PossiblePizzas<Toppings extends Topping[]> = Toppings[number] extends infer T ? [T, T, T] : never;
// or type PossiblePizzas<Toppings extends Topping[]> = [Toppings[number],Toppings[number],Toppings[number]]

type InStock = PossiblePizzas<["bacon", "cheese", "olives", "onions"]>

const pizza1: InStock = ["onions", "cheese", "olives"]
const pizza2: InStock = ["cheese", "olives", "bacon"]
const pizza3: InStock = ["bacon", "cheese", "mushrooms"] // <-- should not be valid

// The Pizza store has an infinite supply of cheese onions and olives
// Make an AvailablePizzas that use these 3 toppings as default value for the Toppings parameter
type AvailablePizzas<Toppings extends Topping[] = ["cheese", "onions", "olives"]> = Toppings[number] extends infer T ? [T, T, T] : never;

const pizza4: AvailablePizzas = ["cheese", "cheese", "cheese"]
const pizza5: AvailablePizzas<["cheese", "mushrooms", "bacon"]> = ["bacon", "mushrooms", "cheese"]
const pizza6: AvailablePizzas = ["onions", "cheese", "bacon"] // <-- should not be valid

