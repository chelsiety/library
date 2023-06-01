let myLibrary = [];

// Initializes the construction of a book (constructor function) based on info passed into this function
function Book(title, author, pages, published, readStatus) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.published = published;
	this.readStatus = readStatus;
}

Book.prototype.toggleRead = () => {
	this.readStatus = !this.readStatus; // switch: read to unread and vice versa
	console.log(this.readStatus);
};

function toggleRead(index) {
	myLibrary[index].toggleRead();

	const readToggleBtn = document.querySelector(".book__status-toggle-btn");
	if (this.readStatus === false) {
		readToggleBtn.textContent = "Not Read";
		readToggleBtn.style.backgroundColor = "#4d4d4d";
	} else {
		readToggleBtn.textContent = "Read";
		readToggleBtn.style.backgroundColor = "var(--MAIN-BGCOLOR)";
	}
}

// Display the books from the myLibrary array on HTML
function renderBooks() {
	const libraryEl = document.querySelector(".library");
	libraryEl.innerHTML = ""; // Reset innerHTML content to empty string
	libraryEl.setAttribute("class", "library book__cards-group"); // Add class styling to libraryEl div
	for (let i = 0; i < myLibrary.length; i++) {
		let book = myLibrary[i]; // Retrieve a book element from the library array and assign it to variable, book
		let bookEl = document.createElement("div"); // Create book card element
		bookEl.setAttribute("class", "book__card");

		// Use onclick="removeBook(${i}) as index position labeling of books in library array"
		bookEl.innerHTML = `
			<div class="delete-btn delete-icon" onclick="removeBook(${i})"> 
				<span class="material-symbols-rounded delete-icon">
					close
				</span>
			</div>
				<h3 class="book__title">${book.title}</h3>
				<span class="book__author">
					<span class="book__detail">Author:</span>
					${book.author}
				</span>
				<span class="book__pages">
					<span class="book__detail">Pages:</span>
					${book.pages}
				</span>
				<span class="book__published">
					<span class="book__detail">Published:</span>
				${book.published}
				</span>
				<div class="book__status-toggle>
                        <span class="book__status">Status:</span>
						<button class="button book__status-toggle-btn" onclick="toggleRead(${i})"> 
							${book.readStatus ? "Read" : "Not read"}
						</button>
                </div> 
				`;
		libraryEl.appendChild(bookEl); // Append bookEL to libraryEl
	}
}

// Remove book from library (remove book element at specified index from array and re-render library in HTML)
function removeBook(index) {
	myLibrary.splice(index, 1);
	renderBooks();
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
	renderBooks();
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
