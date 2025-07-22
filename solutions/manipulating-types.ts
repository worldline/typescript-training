// You're managing a book store system.

/*
1. First, create some basic types:
- a Author type alias representing an author with firstName and lastName properties (both strings).
- a Price type alias representing a price, which can be either a number (USD) or a string (e.g., "Special Offer").
*/

type Author = {
    firstName: string;
    lastName: string;
};

type Price = number | string;


/*
2. Create a Book type with the following properties:
- title: string
- authors: an array of Author
- price: Price
*/

type Book = {
    title: string
    authors: Author[]
    price: Price
}

/*
3. Then create the different book types that all extend the main Book type:
- a PaperbackBook with the following properties:
   - pages: number
- a EBook with the following properties:
   - fileFormat: "PDF" or "EPUB" or "MOBI"
   - downloadLink: string
- an AudioBook with the following properties:
   - duration: string
   - narrator: string
*/

type PaperbackBook = Book & { pages: number }
type Ebook = Book & { fileFormat: "PDF" | "EPUB" | "MOBI", downloadLink: string }
type AudioBook = Book & { duration: string, narrator: string }

/* 4. Indexed Access Type
Create an Inventory type that represents a dictionary where keys are strings (book IDs) and values are any kind of Book. Use an indexed access type to define it.
*/

type Inventory = { [isbn: string]: PaperbackBook | Ebook | AudioBook }

/* 5. Keyof operator
Create a ISBN type using the keyof operator on the Inventory type. Notice how numbers are also accepted in this type.
Then create a BookInStore type that is a book available in the inventory
*/

type ISBN = keyof Inventory
type BookInStore = Inventory[ISBN]

/* 6. Type predicates 
Declare type predicate functions isPaperback(book), isEbook(book) and isAudioBook(book) that check if a Book is of the specified type by looking at their specific properties. 
*/

function isPaperbackBook(book: Book): book is PaperbackBook {
    return "pages" in book
}

function isEbook(book: Book): book is Ebook {
    return "fileFormat" in book
}

function isAudioBook(book: Book): book is AudioBook {
    return "duration" in book
}

/* 7. Conditional types
Create a conditional type BookFormat<T extends Book> that extracts the "format" information which varies depending of the book type:
For paperback books, the format is the number of pages. Therefore, if T is PaperbackBook, BookFormat<T> should be number
For ebooks, the format is the file format. Therefore, if T is EBook, BookFormat<T> should be "PDF" | "EPUB" | "MOBI"
For audiobooks, the format is the duration. Therefore, if T is AudioBook, BookFormat<T> should be string
For any other book type, return the "never" type to throw a type error
*/

type BookFormat<T extends Book> =
    T extends PaperbackBook ? PaperbackBook["pages"]
    : T extends Ebook ? Ebook["fileFormat"]
    : T extends AudioBook ? AudioBook["duration"]
    : never

type EBookFormat = BookFormat<Ebook> // "PDF" | "EPUB" | "MOBI"

/* 8. Type Narrowing
Write a function getBookFormat(book) that:
- Uses type narrowing with the previously declared type predicates functions to determine the specific book type.
- Returns the format information according to the BookFormat type previously declared for either PaperbackBook, Ebook or AudioBook
- Throw an error if it doesn't match any of these 3 types
 */

function getBookFormat(book: Book): BookFormat<PaperbackBook> | BookFormat<Ebook> | BookFormat<AudioBook> {
    if (isPaperbackBook(book)) return book.pages
    if (isEbook(book)) return book.fileFormat
    if (isAudioBook(book)) return book.duration
    throw new Error("No details available")
}

/* Validate with example data
The following example code should not report any errors with all the types you declared
*/

const inventory: Inventory = {
    "9780345391803": {
        title: "The Hitchhiker's Guide to the Galaxy",
        authors: [{ firstName: "Douglas", lastName: "Adams" }],
        price: 15.99,
        pages: 224
    },
    "9780191509087": {
        title: "Pride and Prejudice",
        authors: [{ firstName: "Jane", lastName: "Austen" }],
        price: "Special Offer",
        fileFormat: "EPUB",
        downloadLink: "https://example.com/pride-and-prejudice.epub"
    },
    "9780261103870": {
        title: "The Lord of the Rings",
        authors: [{ firstName: "J.R.R.", lastName: "Tolkien" }],
        price: 29.95,
        duration: "11 hours 45 minutes",
        narrator: "Andy Serkis"
    },
    "9780441172719": {
        title: "Dune",
        authors: [{ firstName: "Frank", lastName: "Herbert" }],
        price: 18.50,
        pages: 658
    }
}

const ebooks: Book[] = Object.values(inventory).filter(book => isEbook(book))
const LOTR: ISBN = 9780261103870
getBookFormat(inventory[LOTR])