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
			if (/\+|-|\/|\*|=/.test(prevClick))
			{
				setDisplayAsText(buttonClicked);
			}
			else
			{	
				setDisplayAsText(getDisplayAsText() + buttonClicked);
			}
			prevClick = buttonClicked;
		break;
		case "+":
		case "-":
		case "/":
		case "*":
			operation = operatorClick(buttonClicked);
			break;
		case "=":
			log (operation);
			log (getDisplayAsFloat());
			setDisplayAsText(operation(getDisplayAsFloat()));
			prevClick = buttonClicked;
			break;
		case "C":
			setDisplayAsText("");
			prevClick = "";
			result = 0;
			break;
		case "+/-":
			setDisplayAsText(-1 * getDisplayAsFloat());
			break;
		case ".":
			var currDisplay = getDisplayAsText();
			if (/\./.test(currDisplay))
			{/* DO NOTHING */}
			else if (/\+|-|\/|\*|=/.test(prevClick) || !/^[0-9]/.test(currDisplay))
			{
				setDisplayAsText("0.");
			}
			else
			{
				setDisplayAsText(currDisplay + ".");
			}
			prevClick = buttonClicked;
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


