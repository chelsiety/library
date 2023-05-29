let myLibrary = [];

// Initializes the construction of a book (constructor function) based on info passed into this function
function Book(title, author, pages, published, readStatus) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.published = published;
	this.readStatus = readStatus;
}

// Create a new instance of an object from the constructor function, Book
function addBookToLibrary() {
	// Grab the DOM element values from form field to get the book info
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const pages = document.querySelector("#pages").value;
	const published = document.querySelector("#published").value;
	const readStatus = document.querySelector("#readStatus").checked;
	// Create a new object (new book) based on given form field data
	let newBook = new Book(title, author, pages, published, readStatus);
	console.log(newBook);
	// Add newly created object (book) to the library array
	myLibrary.push(newBook);
	console.log(myLibrary);
}

// Call the function, "addBookToLibrary" when the new book form is submitted
const newBookFormSubmission = document.querySelector(".modal__card-new-book");
newBookFormSubmission.addEventListener("submit", (event) => {
	event.preventDefault();
	addBookToLibrary();
});

// Displays the "add a new book" form when "add book" button is clicked
const addBookBtn = document.querySelector(".book__new-book-btn");
addBookBtn.addEventListener("click", () => {
	const modalNewBook = document.querySelector(".modal__card-new-book");
	modalNewBook.style.display = "block";
});
