// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
const synth = window.speechSynthesis;

// referece to buttons for storymaker
const speakButton = document.querySelector('.translate');
const generateButton = document.querySelector('.generate-story');
const resetButton = document.querySelector('.reset');

// References for story column buttons, 1-5
const selectOne = document.querySelector('.select-1');
const selectTwo = document.querySelector('.select-2');
const selectThree = document.querySelector('.select-3');
const selectFour = document.querySelector('.select-4');
const selectFive = document.querySelector('.select-5');

// Arrays to contain story text
let speachOne = ['The turkey', 'Mom', 'Dad', 'The dog', 'My teacher', 'The elephant', 'The cat'];
let speachTwo = ['sat on', 'ate', 'danced with', 'saw', 'doesn\'t like', 'kissed', 'ran away from'];
let speachThree = ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking', 'a fat', 'a mean'];
let speachFour = ['goat', 'monkey', 'fish', 'cow', 'frog', 'bug', 'worm'];
let speachFive = ['on the moon', 'on the chair', 'in my spaghetti', 'in my soup', 'on the grass', 'in my shoes', 'in my car'];

// Nested array of story text arrays
let speachs = [speachOne, speachTwo, speachThree, speachFour, speachFive]

/* Functions
-------------------------------------------------- */

//populate the HTML table using the arrays
function populateTable() {

	//select table
	const tableBody = document.querySelector('#table tbody');

	//run for the length of the array
	for (let i = 0; i < speachOne.length; i++) {

		//create a new row
		const row = document.createElement('tr');

		//fill the row with the array contents
		row.innerHTML = `
			<td>${speachOne[i]}</td>
			<td>${speachTwo[i]}</td>
			<td>${speachThree[i]}</td>
			<td>${speachFour[i]}</td>
			<td>${speachFive[i]}</td>
		`;

		//append the row to the table
		tableBody.appendChild(row);
	}
}

//read the sentence with text to speech api
function speakNow(string) {
	// create a synth object for text to speech
	const utterThis = new SpeechSynthesisUtterance(string);
	//call speak method to read the text aloud
	synth.speak(utterThis);
	//output text to console
	console.log(string);
	//Display the text at the bottom
	document.querySelector('.story-text').textContent = string;
}

// Generates a story by randomly selecting a cell from each column
function generateStory() {
	// call to resetSelections function
	resetSelections()
	//variable to store story string
    let story = '';
	//loop through each column
    for (let i = 0; i < 5; i++) {
		// get a random index to select
        const rowIndex = Math.floor(Math.random() * (document.getElementById("table").rows.length - 1)) + 1;
		// select the cell with the random index
        const cell = document.getElementById("table").rows[rowIndex].cells[i];
		// add the selected class to random cell
        cell.classList.add("selected");
		//append the selected cell to the story string
        story += cell.textContent + ' ';
    }
}


// Resets the selected cells
function resetSelections() {
	//select all cells with the selected class
	const selectedCells = document.querySelectorAll(".selected");
	//remove the selected class from the cells
	selectedCells.forEach(cell => cell.classList.remove("selected"));
}

/* column button */
function selectCell(rowIndex, colIndex) {
	const row = document.getElementById("table").rows[rowIndex];
	if (row) {
		const cell = row.cells[colIndex];
		if (cell) {
			cell.classList.add("selected");
			return cell;
		}
	}
	console.log("target not found!");
}

// reset column selection
function refreshCol(colIndex) {
	for (let i = 1; i < 8; i++){
		const row = document.getElementById("table").rows[i];
		row.cells[colIndex].classList.remove("selected");
	}
}

// grabs all cells with selected tag
function getSelected(){
	let targetString = '';
	// rows
	for (let i = 0; i < 5; i++){
		//columns
		for (let j = 0; j < 8; j++){
			const cell = document.getElementById("table").rows[j].cells[i];
			if (cell.classList.contains("selected")){
				targetString = targetString + " " + cell.textContent;
			}
		}
	}
	return targetString;
}

/* Event Listeners
-------------------------------------------------- */
// add javascript array story elements to table once page loads
document.addEventListener('DOMContentLoaded', populateTable);

// add event listener to the text to speach button
speakButton.addEventListener('click', function () {
	// call the text to speach api with selected text
	speakNow(getSelected());
});

// add event listener to generate story button
generateButton.addEventListener('click', generateStory);

// add event listener to reset selections button
resetButton.addEventListener('click', resetSelections);

// button listeners for each story element column
selectOne.addEventListener('click', function() {
	//call to function to remove selected tag
	refreshCol(0);
	// add selected class to a new random cell
	selectCell(Math.floor(Math.random() * (8 - 1) + 1), 0).textContent;
});
selectTwo.addEventListener('click', function() {
	refreshCol(1);
	selectCell(Math.floor(Math.random() * (7 - 1) + 1), 1).textContent;
});
selectThree.addEventListener('click', function() {
	refreshCol(2);
	selectCell(Math.floor(Math.random() * (8 - 1) + 1), 2).textContent;
});
selectFour.addEventListener('click', function() {
	refreshCol(3);
	selectCell(Math.floor(Math.random() * (8 - 1) + 1), 3).textContent;
});
selectFive.addEventListener('click', function() {
	refreshCol(4);
	selectCell(Math.floor(Math.random() * (7 - 1) + 1), 4).textContent;
});

