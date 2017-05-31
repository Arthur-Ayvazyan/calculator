
var display = document.getElementById('display'),
	equal = document.getElementById('equal'),
	calc = document.getElementById('calculator'),
	backspaces = document.getElementById('backspace'),
	pow = document.getElementById('power'),
	c = document.getElementById('c'),
	buttons = document.getElementsByClassName('button'),
	math = document.getElementsByClassName('math'),
	zero = document.getElementsByClassName('zero')[0],
	dots = document.getElementsByClassName('buttond')[0];
	display.value = 0;

	

window.onkeydown = function(e) {
	var last = display.value.length-1,
     	index = display.value.charAt(last);
	(e.keyCode === 8) ? backspace() : '';
	if(display.value.length > 20){
		return;
	}
	(e.keyCode === 13) ? answer() : '';
	(e.keyCode === 48  || e.keyCode === 96)  ? zeroAdd() : '';	
	(e.keyCode === 49  || e.keyCode === 97)  ? addToScreen('1') : 	
	(e.keyCode === 50  || e.keyCode === 98)  ? addToScreen('2') : 	
	(e.keyCode === 51  || e.keyCode === 99)  ? addToScreen('3') :	
	(e.keyCode === 52  || e.keyCode === 100) ? addToScreen('4') :	
	(e.keyCode === 53  || e.keyCode === 101) ? addToScreen('5') :	
	(e.keyCode === 54  || e.keyCode === 102) ? addToScreen('6') :	
	(e.keyCode === 55  || e.keyCode === 103) ? addToScreen('7') :	
	(e.keyCode === 56  || e.keyCode === 104) ? addToScreen('8') :
	(e.keyCode === 57  || e.keyCode === 105) ? addToScreen('9') : 
	(e.keyCode === 190 || e.keyCode === 110) ? dotAdd() : '';

	if(index >= 0 || index <=9){
		(e.keyCode === 107 || e.keyCode === 187) ? math[0].click() :	
		(e.keyCode === 109 || e.keyCode === 189) ? math[1].click() :	
		(e.keyCode === 191 || e.keyCode === 111) ? math[3].click() :	
		(e.keyCode === 106) ? math[2].click() : '';
	} 	
}

function dotAdd() {
	if(display.value.length > 20){
		return;
	}
	var last = display.value.length-1,
		index = display.value.charAt(last),
		arr = display.value;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == '.') {
			var dot = i;
		}
		if(arr[i] == '+' || arr[i] == '-' || arr[i] == '*' || arr[i] == '/') {
			var p = i; 
		}
	}
	if(dot > p ){
		return;
	}
	if(dot && p == undefined){
		return;
	}
	if(display.value.length = 1 && display.value == '0') {
		addToScreen('0' + '.');
	}
	else{
		if(index >= 0 || index <=9){
			addToScreen( '.');
		}
	}
}

function zeroAdd() {
	if(display.value.length > 20){
		return;
	}
	var last = display.value.length-1;
	if(display.value[last] == '/' ) {
		return;
	}
		if(display.value[last-1] == '.' || (display.value[last-1] > 0 || display.value[last-1] <=9) ) {
			addToScreen('0');
		}
		if(display.value.length == 1 && display.value != 0) {
			addToScreen('0');
		}
}

function numberAdd() {
	if(display.value.length > 20){
		return;
	}
	var value = this.value;
	var last = display.value.length-1;
	if(value == 'c' || value == '<--' || value == 'X^3' || value == '=') {
		return;
	}
	addToScreen(value);
}

function mathAdd(){
	if(display.value.length > 20){
		return;
	}
	var last = display.value.length-1,
	value = this.value,
	arr = display.value;

	if(display.value == 0 || display.value[last] == '.') {
		return;
	}
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == '+' || arr[i] == '-' || arr[i] == '*' || arr[i] == '/') {
			answer();
			var returnAnswer = answer();
			if(returnAnswer == 0) {
				display.value = 0;
				return;
			}
		}
	}
	addToScreen(value);
}

function answer(){
	try {
  		x = display.value;
		x = eval(x);
		display.value = x;
		return x;
	} 
	catch (err) {
		removeLastElem();
	}
}

function removeLastElem(){
	var number = display.value;
	var last = number.length-1;
	var newNumber = number.substring(0, last);
	display.value = newNumber;
}

function addToScreen(x){
	if(display.value == 'Error') {
		display.value = '';
	}
	if(display.value.length = 1 && display.value == '0') {
		display.value = '';
	}
	display.value += x;
}

function clear(x){
	display.value = 0;
}

function backspace(){
	if(display.value != '0') {
		removeLastElem();
		if(display.value.length == 0){
			display.value = 0;
		}
	}
}

function power(){
	if(display.value.length > 20){
		return;
	}
	x = display.value;
	x = eval(x);
	x = Math.pow(x, 3);
	display.value = x;
}

equal.addEventListener('click', answer);
backspaces.addEventListener('click', backspace);
pow.addEventListener('click', power);
c.addEventListener('click', clear);
dots.addEventListener('click', dotAdd);
zero.addEventListener('click', zeroAdd); 
for(var i = 0; i < math.length; i++) {
	math[i].addEventListener('click', mathAdd);
}
for(var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', numberAdd);

}
