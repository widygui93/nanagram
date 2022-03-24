const availableLocation = [];
for (let r = 1; r <= 5; r++) {
	for (let c = 1; c <= 5; c++) {
		availableLocation.push(`${r},${c}`);
	}
}

const nanagramContainer = document.querySelector(".nanagram-container");
let chances = parseInt(document.querySelector("#chances").innerHTML);
let divRow = "";
let divCol = "";
const xLocation = [];
const oLocation = [];
for (let row = 0; row < 5; row++) {
	divRow = document.createElement("div");
	divRow.classList.add(`row-${row + 1}`);
	nanagramContainer.appendChild(divRow);

	for(let column = 0; column < 5; column++){
		divCol = document.createElement("div");
		divCol.classList.add("col");
		divCol.setAttribute("onclick","check(this)");
		divCol.setAttribute("data-column-number", `${column + 1}`);

		// either get X or O by random
		if(Math.random() < 0.5){
			xLocation.push(`${row + 1},${column + 1}`);
		} else {
			oLocation.push(`${row + 1},${column + 1}`);
		}
		document.querySelector(`.row-${row + 1}`).appendChild(divCol);
	}
}


let selectedRow = "";
let selectedCol = "";
let selectedCharacter = "";
let selectedBoxLocation = "";
let indexLoc = 0;
function check(box) {

	selectedCharacter = document.getElementById("selected-character").innerHTML;

	selectedRow = parseInt(box.parentNode.getAttribute("class").charAt(4));
	selectedCol = parseInt(box.getAttribute("data-column-number"));

	selectedBoxLocation = `${selectedRow},${selectedCol}`;

	if(selectedCharacter === "X"){
		if(xLocation.includes(selectedBoxLocation)){
			box.innerHTML = "X";

			checkPossibleWinning();
		} else {
			box.innerHTML = "O";

			checkPossibleLosing();
		}
	} else {
		if(oLocation.includes(selectedBoxLocation)){
			box.innerHTML = "O";

			checkPossibleWinning();
		} else {
			box.innerHTML = "X";

			checkPossibleLosing();
		}
	}

}

function checkPossibleWinning(){
	if(availableLocation.includes(selectedBoxLocation)) {
		indexLoc = availableLocation.indexOf(selectedBoxLocation);
		availableLocation.splice(indexLoc,1);
	}
	if(availableLocation.length == 0) {
		document.querySelector(".result-text").innerHTML = "You Won";
	}
}

function checkPossibleLosing(){
	if(availableLocation.includes(selectedBoxLocation)) {
		indexLoc = availableLocation.indexOf(selectedBoxLocation);
		availableLocation.splice(indexLoc,1);
	}

	chances--;
	document.querySelector("#chances").innerHTML = chances;
	if(chances == 0) {
		document.querySelector(".result-text").innerHTML = "You Lose";
	}

}

print_oSequence_for("row");
print_oSequence_for("column");

function print_oSequence_for(location){
	let coordinate = "";
	let counter = 0;
	let oSequences = [];

	for (let i = 1; i <= 5 ; i++) {
		// j <= 6 agar hasil pengecekan coordinate include oLocation
		//  salah sehingga nilai counter = 1 bisa dipush ke oSequence
		for (let j = 1; j <= 6; j++) {
			coordinate = (location === "row") ? `${j},${i}` : `${i},${j}`;
			if(oLocation.includes(coordinate)){
				counter++;
			} else {
				if(counter != 0){
					oSequences.push(counter);
					counter = 0;
				}
			}
		}
		document.querySelector(`${(location === "row") ? ".row-header" : ".column-header"} > div:nth-child(${i})`).innerHTML = 
		`${ oSequences.length == 0 ? 0 :  oSequences.toString()}`;
		oSequences = [];
	}
}

let switchCharacter = document.getElementById("switch-char");
let tempChar = "";
switchCharacter.addEventListener("click", function(event){
	event.preventDefault();
	tempChar = document.getElementById("selected-character").innerHTML;
	document.getElementById("selected-character").innerHTML = document.getElementById("non-selected-character").innerHTML;

	document.getElementById("non-selected-character").innerHTML = tempChar;
});

function cheatcode(){
	console.log("X coordinate (row,col)");
	xLocation.map(x => console.log(x));
}