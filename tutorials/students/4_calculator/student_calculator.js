function log(s) {
  if(console && console.log) {
    console.log(s);
  }
}

var result = 0;
var prevClick = "";
var operation = function(a) {return a;};

function operatorClick (operator)
{
	prevClick = operator;
	result = getDisplayAsFloat();
	switch (operator)
	{
		case "+":
			return function (a) { return result + a; };
			break;
		case "-":
			return function (a) { return result - a; };
			break;
		case "*":
			return function (a) { return result * a; };
			break;
		case "/":
			return function (a) { return result / a; };
			break;
	}
}

function clickMe (event)
{
	var buttonClicked = getInnerText(event["srcElement"]["firstChild"]);
	switch (buttonClicked)
	{
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if (/[+-/*]/.test(prevClick))
			{
				prevClick = buttonClicked;
				setDisplayAsFloat(buttonClicked);
			}
			else
			{	
				setDisplayAsFloat(getDisplayAsText() + buttonClicked);
			}
		break;
		case "+":
		case "-":
		case "/":
		case "*":
			operation = operatorClick(buttonClicked);
			break;
		case "=":
			setDisplayAsFloat(operation(getDisplayAsFloat()));
			break;
		case "C":
			setDisplayAsText("");
			result = 0;
			break;
		case "+/-":
			setDisplayAsFloat(-1 * getDisplayAsFloat());
		case ".":
			//TODO
			break;
		case "M+":
		case "M-":
		case "MR":
		case "MC":
		default:
			log (buttonClicked);
			break;
	}	
}

function addEventHandlers ()
{
	var buttonElements = document.getElementsByClassName("button");
	for (var i = 0; i < buttonElements.length; i++)
	{
		addEvent(buttonElements[i], "click", clickMe);
	}
	setDisplayAsText("");
}

addEvent(window, "load", addEventHandlers);


