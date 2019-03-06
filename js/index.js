var questionNum = 0;						// keep count of question, used for IF condition.
var question = '<h1>What is your name?</h1>';			  // first question

var output = document.getElementById('output');			// store id="output" in output variable
output.innerHTML = question;					// ouput first question

function bot() { 
    var input = document.getElementById("input").value;
    if (questionNum == 0) {
    output.innerHTML = '<h1>Hello ' + input + '!</h1>';// output response
    document.getElementById("input").value = "";   		// clear text box
    question = '<h1>How can I help you ' + input +'</h1>';	// load next question		
    setTimeout(timedQuestion, 1500);				// output next question after 2sec delay
    }

    else if (questionNum == 1) {
    if(input.indexOf("weather") !== -1 || input.indexOf("Weather") !== -1 )
    {
      output.innerHTML = '<h1>Yahh Sure!!!!!!</h1>';
      window.open('index2.html');
    }
    else {
      window.alert("Please enter valid query");
      questionNum=0;
    }
      //document.getElementById("input").value = "";					      	
    //setTimeout(timedQuestion, 2000);
    }
}

function timedQuestion() {
    output.innerHTML = question;
}

//push enter key (using jquery), to run bot function.
$(document).keypress(function(e) {
  if (e.which == 13) {
    bot();		// run bot function when enter key pressed
    questionNum++;	// increase questionNum count by 1
  }
});
