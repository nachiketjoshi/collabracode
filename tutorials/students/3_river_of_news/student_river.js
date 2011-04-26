function formatCorrectly (input)
{
	return input.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
}

function clickMe (event)
{
	var elemDescription = event["target"]["nextSibling"]["nextSibling"];
	if (elemDescription.getAttribute("class").search(/hidden/) != -1)
	{
		elemDescription.setAttribute("class", "article-description");
	}
	else
	{
		elemDescription.setAttribute("class", "article-description hidden");
	}
}

function processItem (element, index, array)
{
	var heading = document.createElement("div");
	heading.appendChild(document.createTextNode(formatCorrectly(element["title"])));
	heading.setAttribute("class", "article-title");
	addEvent(heading, "click", clickMe);
	
	var link = document.createElement("a");
	link.setAttribute("href", element["link"]);
	link.appendChild(document.createTextNode("Source"));
	
	var description = document.createElement("div");
	description.innerHTML = formatCorrectly(element["description"]);
	description.setAttribute("class", "article-description hidden");
	
	var item = document.createElement("div");
	item.appendChild(heading);
	item.appendChild(link);
	item.appendChild(description);
	document.getElementById("river").appendChild(item);
}

var riverCallback = {
  "onsuccess" : function(obj) {
	var titleElement = document.getElementById("title");
	titleElement.setAttribute("class", "title");
	titleElement.appendChild(document.createTextNode("Nachi's News"));
	
	obj["rss"]["channel"]["item"].forEach(processItem);	
    
	log("SUCCESS: Loaded rss.json file");
  },
  "onerror" : function(req) {
    log("ERROR: Unable to download rss.json file" + req);
  }
};
