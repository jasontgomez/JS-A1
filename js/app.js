// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
const synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
const speakButton = document.querySelector('.translate');
const generateButton = document.querySelector('.generate-story');
const resetButton = document.querySelector('.reset');
const selectOne = document.querySelector('.select-1');
const selectTwo = document.querySelector('.select-2');
const selectThree = document.querySelector('.select-3');
const selectFour = document.querySelector('.select-4');
const selectFive = document.querySelector('.select-5');


// test variables
/* let textToSpeak = 'This is the text string that you will generate with your script';
let speachOne = ['The turkey', 'Mom', 'Dad', 'The dog', 'My teacher', 'The elephant', 'The cat'];
let speachTwo = ['sat on', 'ate', 'danced with', 'saw', 'doesn\'t like', 'kissed'];
let speachThree = ['a funny', 'a scary', 'a goofy', 'a slimy', 'a barking', 'a fat'];
let speachFour = ['goat', 'monkey', 'fish', 'cow', 'frog', 'bug', 'worm'];
let speachFive = ['on the moon', 'on the chair', 'in my spaghetti', 'in my soup', 'on the grass', 'in my shoes'];
 */
/* Functions
-------------------------------------------------- */
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	const utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
	console.log(string);
}

// Generates a story by randomly selecting a cell from each column
function generateStory() {
	resetSelections()
    let story = '';
    for (let i = 0; i < 5; i++) {
        const rowIndex = Math.floor(Math.random() * (document.getElementById("table").rows.length - 1)) + 1;
        const cell = document.getElementById("table").rows[rowIndex].cells[i];
        cell.classList.add("selected");
        story += cell.textContent + ' ';
    }
}


// Resets the selected cells
function resetSelections() {
	const selectedCells = document.querySelectorAll(".selected");
	selectedCells.forEach(cell => cell.classList.remove("selected"));
}

/* Event Listeners
-------------------------------------------------- */
// The click event handler for the button that speaks the text contained in the above var textToSpeak
speakButton.addEventListener('click', function () {
	speakNow(getSelected());
});

generateButton.addEventListener('click', generateStory);

resetButton.addEventListener('click', resetSelections);

// button listeners
selectOne.addEventListener('click', function() {
	refreshCol(0);
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