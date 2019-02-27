
// Массив библиотеки, проверка есть ли в локальном хранилище что-то
let myLibrary = localStorage.getItem('myKey') ? JSON.parse(localStorage.getItem('myKey')) : [];

// Для поп-апа
const modal = document.getElementById('book-modal');
const btn = document.getElementById('add-new-book');


// Массив библиотеки из строки в строку
localStorage.setItem('myKey', JSON.stringify(myLibrary));
const returnLib = JSON.parse(localStorage.getItem('myKey'));


// отображение каждой книги при обновлении страницы
returnLib.forEach(item => {
	render(item);
});



// Конструктор книги

class Book {
  constructor(title, author, pages, read) { 
  	this.title = title;
  	this.author = author;
  	this.pages = pages;
  	this.read = read;
  }
}


// Функция при помощи которой добавляю книгу в билиотеку, получаю значения - информацию о книге из спрятанной формы

function addBookToLibrary() { 

  let title = document.getElementById('title');
  let titleVal = title.value;

  let author = document.getElementById('author');
  let authorVal = author.value;

  let pages = document.getElementById('pages');
  let pagesVal = pages.value;

  let read = document.getElementById('read');
  let readVal;
  if (read.checked === true) {
  	readVal = true;
  } else {
  	readVal = false;
  }

// Добавление книги в библиотеку-массив со значениями, полученными из формы выше, если какие-то поля не заполнены, то там ничего не пишется, а книга по-умолчанию не прочитана, 
// Вызывается функция создания карточки книги
// Вызывается функция включения / выключения формы, в данном случе форма выключается, потому что по-умолчанию она спрятана

  myLibrary.push(new Book(titleVal, authorVal, pagesVal, readVal));
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  render();
  openModal();
  localStorage.setItem('myKey', JSON.stringify(myLibrary));
  return myLibrary;
}

// Функция удаления 1 книги из массива сплайсом начиная с себя, создает карточку заново

function deleteBook(index) {
	myLibrary.splice(index, 1);
  localStorage.clear();
	render();
}

// Функция переключения кнопки прочитана / не прочитана книга, создает карточку заново

function toggleRead(index) {
	let book = myLibrary[index];
	book.read = !book.read;
	render();
	return myLibrary;
}



// Функция создания карточки книги


function render() {
  const libraryCont = document.getElementById('library');
  libraryCont.innerHTML = '';

  const markup = myLibrary.map((book,index) => 
    `<div class="card col-3" id = "${index}">
              <h2>${book.title}</h2>
              <h3>${book.author}</h3>
              <p>${book.pages}</p>
              ${book.read ? `<button class="toggle-read button-success">Read</button>` : `<button class="toggle-read button-secondary">Not Read</button>`}
            <button class="delete-button">Delete</button>
            </div>`     
).join(" ");
  libraryCont.innerHTML = markup;
}

// Pop-up window


function openModal() {
	if (modal.style.display === 'none') {
		modal.style.display = 'block';
	} else {
		modal.style.display = 'none';
	}
}

btn.addEventListener('click', openModal);



function addEventListeners () {
  const library = document.getElementById('library')

  library.addEventListener('click', function (e) {
    // получить id карточки
    let index = e.target.parentNode.id;

    // если e.target это кнопка удаления
    if (e.target.classList.contains('delete-button')) {
      deleteBook(index)
    } else if (e.target.classList.contains('toggle-read')) {
      toggleRead(index)
    }
  })
}

addEventListeners();
