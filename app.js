// Data Structures

class Book {
	//Initializes the construction of a book based on the info passed into this constructor function
	constructor(
		title = "Unknown",
		author = "Unknown",
		pages = "0",
		isRead = false
	) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}
class Library {
	constructor() {
		this.books = []; // Array of book objects
	}

	addBook(newBook) {
		// Ensures no book title duplicates are added (If specified book is NOT in library, add new book to "books" array)
		if (!this.isInLibrary(newBook)) {
			this.books.push(newBook); // Add newly created object (book) to "books" array
		}
	}

	removeBook(title) {
		// Updates the "books" array filled with elements (books) that does NOT contain the selected book title.
		this.books = this.books.filter((book) => book.title !== title);
	}

	getBook(title) {
		// Selects the title of the book (returns the value (title) of the first element that passes a test)
		return this.books.find((book) => book.title === title);
	}

	isInLibrary(newBook) {
		// Search for book title duplicates (returns true or false)
		return this.books.some((book) => book.title === newBook.title);
	}
}

// Create a new instance of an object (new object/ new library) from the constructor function, Library
const library = new Library();

// User Interface - Get DOM elements of UI
const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const overlay = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const booksGrid = document.getElementById("booksGrid");

// Arrow functions
const openAddBookModal = () => {
	addBookForm.reset(); // Clear the form fields, reset the values of all elements in a form
	addBookModal.classList.add("active"); // Display modal when "addBookBtn" button is clicked
	overlay.classList.add("active"); // Add transparent gray background when modal is displayed
};

const closeAddBookModal = () => {
	addBookModal.classList.remove("active");
	overlay.classList.remove("active");
};

const closeAllModals = () => {
	closeAddBookModal();
};

const handleKeyboardInput = (e) => {
	if (e.key === "Escape") closeAllModals();
};

// Render or display updated books grid in HTML
const updateBooksGrid = () => {
	resetBooksGrid();
	// Loop through the 'books' array in library class and create a book card for each book object
	for (let book of library.books) {
		createBookCard(book);
	}
};

// Reset innerHTML content to empty string to prevent repetition of book cards due to "for loops"
const resetBooksGrid = () => {
	booksGrid.innerHTML = "";
};

// Display book in HTML by creating HTML elements
const createBookCard = (book) => {
	const bookCard = document.createElement("div");
	const title = document.createElement("h3");
	const author = document.createElement("p");
	const pages = document.createElement("p");
	const buttonGroup = document.createElement("div");
	const readBtn = document.createElement("button");
	const removeBtn = document.createElement("button");

	// Add classes to HTML elements
	bookCard.classList.add("book-card");
	title.classList.add("title");
	buttonGroup.classList.add("button-group");
	readBtn.classList.add("btn");
	removeBtn.classList.add("btn");

	// Event listeners for "read" toggle button and "remove" button
	readBtn.onclick = toggleRead;
	removeBtn.onclick = removeBook;

	// Add text content to book card's HTML elements
	title.textContent = `"${book.title}"`;
	author.textContent = `Author: ${book.author}`;
	pages.textContent = `Length: ${book.pages} pages`;
	removeBtn.textContent = "Remove";

	if (book.isRead) {
		// Add text content and class (color) if true (isRead === true)
		readBtn.textContent = "Read";
		readBtn.classList.add("btn-light-violet");
	} else {
		readBtn.textContent = "Not read";
		readBtn.classList.add("btn-light-red");
	}

	// Append newly created title, author, pages elements to bookCard
	bookCard.appendChild(title);
	bookCard.appendChild(author);
	bookCard.appendChild(pages);
	// Append newly created buttons to buttonGroup
	buttonGroup.appendChild(readBtn);
	buttonGroup.appendChild(removeBtn);
	// Append newly created buttonGroup to bookCard
	bookCard.appendChild(buttonGroup);
	// Append newly created bookCard to booksGrid
	booksGrid.appendChild(bookCard);
};

const getBookFromInput = () => {
	// Grab the DOM element values from the form field (get book info)
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const isRead = document.getElementById("isRead").checked;

	// Create new object (new book) based on given book info
	return new Book(title, author, pages, isRead);
};

const addBook = (e) => {
	e.preventDefault(); // Prevent default action of 'submit input' which is sending data to a server
	const newBook = getBookFromInput(); // Get book info/ details from the "add book form"

	library.addBook(newBook); // Call class function - update "books" array
	updateBooksGrid(); // Render or display updated books grid in HTML

	closeAddBookModal();
};

const removeBook = (e) => {
	const title =
		e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");
	// e.target.parentNode.parentNode.firstChild.innerHTML = clicked removeBtn's parent node, and its parent node's first child's innerHTML which the element that contains the title
	// Returns the title name without the quotation marks
	// replaceAll removes the quotation marks ("") and replaces the ("") with nothing (empty string)

	library.removeBook(title); // Call class function - update "books" array
	updateBooksGrid(); // Render or display updated books grid in HTML
};

const toggleRead = (e) => {
	const title =
		e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', "");

	const book = library.getBook(title); // Call class function - selects the book object with the targeted title from the "books" array
	book.isRead = !book.isRead; // Switch (true or false): toggle between 'read' and 'not read' status for targeted book object (book card)
	updateBooksGrid(); // Render or display updated books grid in HTML - with updated toggle status class styling and textContent(isRead)
};

// Event listeners for modal
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAllModals;
addBookForm.onsubmit = addBook;
window.onkeydown = handleKeyboardInput;
