//  Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// Constructor UI
function UI(){}

// Add book to list
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // create tr element
    const row = document.createElement('tr');
    // Insert col
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class = "delete">X</a></td>
    `;

    list.appendChild(row);
}

//Show alert
UI.prototype.showAlert = function(message, className){
    // create div
    const div = document.createElement('div');
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert alert
    container.insertBefore(div, form);
    // set time out
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
} 

// Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners for add
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    
    // Instantiate Book
    const book = new Book(title, author, isbn);
    
    // Instantiate UI
    const ui = new UI();
    

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error')
    }
    else{
        // Add Book to list
        ui.addBookToList(book);

        // show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
    }
 
    

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // initiate UI
    const ui = new UI();
    // delete book
    ui.deleteBook(e.target);
    // show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
})