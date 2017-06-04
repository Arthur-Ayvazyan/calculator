
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

	(e.key == '=' || e.key == 'Enter') ? answer() : '';
	(e.key == 0) ? zeroAdd() : '';	
	(e.key == 1) ? numberAdd(e.key) : 	
	(e.key == 2) ? numberAdd(e.key) : 	
	(e.key == 3) ? numberAdd(e.key) :	
	(e.key == 4) ? numberAdd(e.key) :	
	(e.key == 5) ? numberAdd(e.key) :	
	(e.key == 6) ? numberAdd(e.key) :	
	(e.key == 7) ? numberAdd(e.key) :	
	(e.key == 8) ? numberAdd(e.key) :
	(e.key == 9) ? numberAdd(e.key) : 
	(e.key == '.' ) ? dotAdd() : '';

	if(index >= 0 || index <=9){
		(e.key == '+') ? math[0].click() :	
		(e.key == '-') ? math[1].click() :	
		(e.key == '*') ? math[2].click() :	
		(e.key == '/') ? math[3].click() : '';
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

function numberAdd(value) {
	var last = display.value.length-1;
	if(display.value.length > 20){
		return;
	}
	if(value == 'c' || value == '<--' || value == 'X^3' || value == '=') {
		return;
	}
	if((display.value.length > 1) && (display.value[last] == 0) && (display.value[last - 1] != '.' )){
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
	buttons[i].onclick = function(){
		numberAdd(this.value);
}

}
