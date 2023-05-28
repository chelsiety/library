let myLibrary = [];

function Book() {
	// the constructor...
}

function addBookToLibrary() {
	// do stuff here
}

const addBookBtn = document.querySelector(".book__new-book-btn");

addBookBtn.addEventListener("click", () => {
	const modalNewBook = document.querySelector(".modal__card-new-book");
	modalNewBook.style.display = "block";
});
