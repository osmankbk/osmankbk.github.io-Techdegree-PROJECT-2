
/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Title: Treehouse Project 2
//Project: List Filter and Pagination
//Goal: exceed expectation

//If i get anything less than exceed expectation, please fail it so i can try for exceed expectation again. Thank Your

// Selected the variables i'll be calling througout the project
const pageDiv = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const studentList = document.querySelectorAll('.student-item');
// Created the showPage function that takes a list & page number, hides the entire list
// except the ones that should be shown on the given page number when called.
const showPage = (list, page) => {
	const first = (page * 10) - 10;
	const last = (page * 10) - 1;
	for (let i = 0; i < list.length; i++) {
		if (i >= first && i <= last) {
			list[i].style.display = 'block';
		} else {
			list[i].style.display = 'none';
		}
	}
};

// A DRY function that creates an element, give it a property and its value.
const createElement = (elementName, property, value) => {
	const element = document.createElement(elementName);
	element[property] = value;
	return element;
};

// A function the removes the buttons on a page when called
const removeLinks = () => {
	const removInk = document.querySelector('.pagination');
	if (removInk) {
		removInk.parentNode.removeChild(removInk);
	}
};

// The function that creates and appends the buttons to the page
const appendPageLinks = (list) => {
  // This function checks for old buttons when the page re-freshes and remove them before adding new ones
	const removePagination = () => {
		const removePagi = document.querySelector('.pagination');
		if (removePagi) {
			removePagi.parentNode.removeChild(removePagi);
		}
	}
	removePagination();
	const numberOfPages = Math.ceil(list.length / 10);
	const paginationDiv = createElement('div', 'className', 'pagination');
	pageDiv.appendChild(paginationDiv);
	const paginationUl = document.createElement('ul');
	paginationDiv.appendChild(paginationUl);

	for (let i = 0; i < numberOfPages; i++) {
		const pageLi = document.createElement('li');
		const pageLink = createElement('a', 'href', '#');
    // This if statement highlights the first button on the page when it loads
		if (i === 0) {
			pageLink.className = 'active';
		}

		pageLink.textContent = i + 1;
		pageLi.appendChild(pageLink);
		paginationUl.appendChild(pageLi);
		pageLink.addEventListener('click', (e) => {
			e.preventDefault();
			showPage(studentList, i + 1);
			const target = e.target;
			const links = document.getElementsByTagName('a');
			if (target.tagName === 'A') {
				for (let i = 0; i < links.length; i++) {
					links[i].classList.remove('active');
				}
				target.className = 'active';
			}
		});
	}
};

// The function that runs when a search is not found(error message)
const errorMessage = () => {
	const error = createElement('h2', 'className', 'error');
	error.textContent = `Name not found. Please enter a valid name and try again`;
	pageDiv.appendChild(error);
};

// The function that runs when the 'search button' is clicked or a name is typed('keyup')
const filter = (input) => {
	const list = document.querySelectorAll('h3');
	const searchedList = [];
  // This funcetion checks for and clears out any previous error-message when the page reloads
	const removeErrorMessage = () => {
		const getError = document.querySelector('.error');
		if (getError) {
			pageDiv.removeChild(getError);
		}
	};
	removeErrorMessage();

	for (let i = 0; i < list.length; i++) {
		const search = input.value.toLowerCase();
		const listGParent = list[i].parentNode.parentNode;
		const listText = list[i].textContent;
		listGParent.style.display = 'none';
		if (listText.includes(search)) {
			searchedList.push(listGParent);
		}
	}
	if (searchedList.length <= 0) {
		errorMessage();
		removeLinks();
	}
	appendPageLinks(searchedList);
	showPage(searchedList, 1);
};

// The function that creates the search div, button, input and append it to the header.
// Its the first half of the filter() function
const search = () => {
	const searchDiv = createElement('div', 'className', 'student-search');
	const searchInput = createElement('input', 'type', 'text');
	const searchButton = createElement('button', 'textContent', 'search');
	searchInput.placeholder = 'Search for students';
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchButton);
	pageHeader.appendChild(searchDiv);
	searchButton.addEventListener('click', (e) => {
		filter(searchInput);
	});
	searchInput.addEventListener('keyup', (e) => {
		filter(searchInput);
	});
};
search();
showPage(studentList, 1);
appendPageLinks(studentList);
