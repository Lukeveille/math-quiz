document.addEventListener('DOMContentLoaded', () => {
    // Initialize global variables.
    var score;
    var q;
    var scoreBoard;
    var range = 12;
    var questions = '';
    var mathType;
    var msgBox = document.getElementById('msgBox');
    var params = document.getElementById('params');
    var rand1;
    var rand2;
    var posNeg = 0;
    
    defaultScreen();
    
    // Default prompt screen to set up questions.
    function defaultScreen() {
        score = 0;
        q = 0;
        scoreBoard = new Array();   
    
        msgBox.innerHTML = '';
        clearParams();
    
        var hiInteger = document.createTextNode('Highest integer you\'d like to see:');
        var rangeBox = document.createElement('input');
        var qCount = document.createTextNode('How many questions?');
        var qBox = document.createElement('input');
        var typeSelect = document.createElement('select');
        var startButton = document.createElement('input');
        var option1 = document.createElement('option');
        var option2 = document.createElement('option');
        var option3 = document.createElement('option');
    
        setChild(params, {hiInteger, rangeBox, qCount, qBox, typeSelect, startButton});
        setChild(typeSelect, {option1, option2, option3});
    
        setAttributes(rangeBox, {'id': 'range', 'value': range, 'type': 'text', 'class': 'fontStyle', 'size': '5'});
        setAttributes(qBox, {'id': 'questions', 'value': questions, 'type': 'text', 'class': 'fontStyle', 'size': '5'});
        setAttributes(typeSelect, {'id': 'mathType', 'class': 'fontStyle', 'type': 'select'});
        setAttributes(startButton, {'type': 'button', 'class': 'fontStyle', 'value': 'Let\'s do some math!', 'id': 'start', 'onMouseUp': 'initialize()'});
    
        startButton.innerHTML='Let\'s do some math!';
    
        option1.setAttribute('value', '1');
        option1.innerHTML='Addition/Subtraction';
        option2.setAttribute('value', '2');
        option2.innerHTML='Multiplication';
        option3.setAttribute('value', '3');
        option3.innerHTML='Division';
    
        qBox.select();
    
        if (mathType==1) {
            option1.setAttribute('selected', 'selected');
        } else if (mathType==2) {
            option2.setAttribute('selected', 'selected');
        } else if (mathType==3) {
            option3.setAttribute('selected', 'selected');
        }
    
        document.getElementById('range').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13){
                initialize();
            } else if (event.keyCode == 40 || event.which == 40) {
                qBox.select();
            }
        };
        document.getElementById('questions').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13){
                initialize();
            } else if (event.keyCode == 38 || event.which == 38) {
                rangeBox.select();
            } else if (event.keyCode == 40 || event.which == 40) {
                startButton.focus();
            }
        };
        document.getElementById('mathType').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13){
                initialize();
            }
        };
        document.getElementById('start').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13){
                initialize();
            } else if (event.keyCode == 38 || event.which == 38) {
                qBox.select();
            }
        };
    }
    
    // Grab input from user.
    function initialize() {
        range = document.getElementById('range').value;
        questions = document.getElementById('questions').value;
        mathType = document.getElementById('mathType').value;
    
        // Make sure user input is valid
        if (isNaN(questions) || questions == '' || questions <= 0 || isNaN(range) || range == '' || range <= 0) {
            error();
        } else {
            questionThread()
        }
    }
    
    // Generates questions and prints them to the parameter box
    function questionThread() {
        // Chooses which operator to print
        if (mathType==1) {
            var fetch = Math.random();
            if (fetch < 0.5) {
                type = '  +  '
                posNeg = 1;
            } else {
                type = '  -  '
                posNeg = 0;
            }
            var base = 1;
            var sub = 0;
        } else if (mathType==2) {
            type='  x  ';
            var base = 2;
            var sub = 1;
        } else if (mathType==3){
            type='  /  ';
            var base = 2;
            var sub = 1;
        }
    
        rand1 = Math.floor((Math.random() * (range - sub)) + base);
        rand2 = Math.floor((Math.random() * (range - sub)) + base);
    
        msgBox.innerHTML = '';
    
        clearParams();
    
        var input = document.createElement('input');
        var button1 = document.createElement('input');
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
    
        var qCount = document.createTextNode('Question ' + (q+1) + ' / ' + questions);
        if (mathType==3) {
            var qThread = document.createTextNode((rand1 * rand2) + type + rand2 + ' ' + ' = ' + ' ');
        } else {
            var qThread = document.createTextNode(rand1 + type + rand2 + ' ' + ' = ' + ' ');
        }
    
        p1.appendChild(qCount);
        
        setChild(params, {p1, qThread, input});
        setAttributes(input, {'id': 'answr', 'size': '5', 'class': 'qBox'});
        setAttributes(button1, {'value': 'Submit', 'id': 'submit', 'type': 'button'});
    
        p2.appendChild(button1);
        params.appendChild(p2);
    
        input.focus();
    
        switch(mathType) {
            case '1':
            button1.setAttribute('onMouseUp', 'addSubAnswr(rand1, rand2, posNeg)');
            document.getElementById('submit').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    addSubAnswr(rand1, rand2, posNeg);
                }
            };
            document.getElementById('answr').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    addSubAnswr(rand1, rand2, posNeg);
                }
            };
            break;
    
            case '2':
            button1.setAttribute('onMouseUp', 'multAnswr(rand1, rand2)');
            document.getElementById('submit').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    multAnswr(rand1, rand2);
                }
            };
            document.getElementById('answr').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    multAnswr(rand1, rand2);
                }
            };
            break;
    
            case '3':
            button1.setAttribute('onMouseUp', 'dividAnswr(rand1, rand2)');
            document.getElementById('submit').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    dividAnswr(rand1, rand2);
                }
            };
            document.getElementById('answr').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    dividAnswr(rand1, rand2);
                }
            };
            break;
        }
    }
    
    // Addition/subtraction function.
    function addSubAnswr(a, b, posNeg) {
        var answr = document.getElementById('answr').value;
        if (posNeg==1) {
            var resultAdd = a + b;
            scoreBoard[q] = [(q+1), a, ' + ', b, (a+b), answr];
            quizResult(answr, resultAdd);
        } else {
            var resultSub = a - b;
            scoreBoard[q] = [(q+1), a, ' - ', b, (a-b), answr];
            quizResult(answr, resultSub);
        }
    }
    // Multiplication function.
    function multAnswr(a, b) {
        var result = a * b;
        var answr = document.getElementById('answr').value;
    
        scoreBoard[q] = [(q+1), a, ' x ', b, (a*b), answr];
        quizResult(answr, result);
    }
    // Division function.
    function dividAnswr(a, b) {
        var answr = document.getElementById('answr').value;
    
        scoreBoard[q] = [(q+1), (a*b), ' / ', b, (a), answr];
        quizResult(answr, a);
    }
    
    // Testing for correct input, and choosing correct output
    function quizResult(answr, result) {
        var subButton = document.getElementById('submit');
    
        if (isNaN(answr) || answr=='') {
            qError();
    
        } else if (answr == (result) && (q+1) == questions) {
            correct();
            score++;
            finalScreen();
    
        } else if (answr == (result)) {
            correct();
    
            setAttributes(subButton, {'value': 'Next Question', 'onMouseUp': 'questionThread()'});
    
            document.getElementById('submit').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    questionThread();
                }
            };
            document.getElementById('answr').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    questionThread();
                }
            };
            score++;
            q++
    
        } else if ((q+1) == questions) {    
            incorrect(result);
            finalScreen();
    
        } else {
            incorrect(result);
    
            setAttributes(subButton, {'value': 'Next Question', 'onMouseUp': 'questionThread()'});
    
            document.getElementById('submit').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    questionThread();
                }
            };
            document.getElementById('answr').onkeyup = function(event){
                if (event.keyCode == 13 || event.which == 13){
                    questionThread();
                }
            };
            q++
        }
    }
    // Final screen with score, new quiz button, and quiz review button.
    function finalScreen() {
        clearParams();
    
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');
        var button2 = document.createElement('input');
        var button3 = document.createElement('input');
    
        p3.innerHTML='YOU SCORED ' + score + ' / ' + questions;
    
        setChild(params, {p3, button2, p4});
        setAttributes(button2, {'id': 'newQuiz', 'type': 'button', 'value': 'New Quiz', 'onMouseUp': 'defaultScreen()'});
        
        p4.appendChild(button3);
    
        button2.focus();
        document.getElementById('newQuiz').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13) {
                defaultScreen();
            } else if (event.keyCode == 40 || event.which == 40) {
                button3.focus();
            }
        };
    
        setAttributes(button3, {'id': 'scoreButton', 'type': 'button', 'value': 'Quiz Review', 'onMouseUp': 'scoreScreen()'});
        document.getElementById('scoreButton').onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13) {
                scoreScreen();
            } else if (event.keyCode == 38 || event.which == 38) {
                button2.focus();
            }
        };
    }
    
    // Displays a list of every question, it's correct answer, and the incorrect answer if there was one.
    function scoreScreen() {
        var button4 = document.createElement('input');
    
        msgBox.innerHTML = '';
        var table='<table align="center"><thead><th>#</th><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><th colspan="4">Question</th><th>&nbsp;</th><th colspan="2">Answer</th></thead><tbody id="scoreBox"><tr></tr>';
        for (var i = 0; i <= q; i++) {
            if (scoreBoard[i][4]==scoreBoard[i][5]) {
                table += '<tr><td>' + scoreBoard[i][0] + '</td><td>&nbsp;</td><td> ' + scoreBoard[i][1] + ' </td><td>' + scoreBoard[i][2] + '</td><td> ' + scoreBoard[i][3] + ' </td><td>=</td><td>&nbsp;</td><td>' + scoreBoard[i][4] + '</td>';
            } else {
                table += '<tr><td>' + scoreBoard[i][0] + '</td><td>&nbsp;</td><td> ' + scoreBoard[i][1] + ' </td><td>' + scoreBoard[i][2] + '</td><td> ' + scoreBoard[i][3] + ' </td><td>=</td><td>&nbsp;</td><td>' + scoreBoard[i][4] + '</td><td style="color: red">' +
                scoreBoard[i][5] + '</td>';
            }
        }
        table = table + '</tbody></table>';
    
        params.innerHTML='<p>YOU SCORED ' + score + ' / ' + questions + '</p>' + table;
        params.appendChild(button4);
    
        setAttributes(button4, {'id': 'newQuiz', 'type': 'button', 'value': 'New Quiz', 'onMouseUp': 'defaultScreen()'});
    
        document.getElementById("newQuiz").onkeyup = function(event){
            if (event.keyCode == 13 || event.which == 13){
                defaultScreen();
            }
        };
    
        button4.focus();
    }
    
    // Helper functions for editing HTML
    function setAttributes(el, attrs) {
        for(var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
    function setChild(el, child) {
        for(var key in child) {
            el.appendChild(child[key]);
        }
    }
    function clearParams() {
        while (params.firstChild) {
            params.removeChild(params.firstChild);
        }
    }
    
    // Display functions for error, correct, and incorrect responses.
    function error() {
        msgBox.setAttribute('style', 'color: red');
        msgBox.innerHTML = 'INPUT ERROR! Must enter positive integer';
    }
    function qError() {
        msgBox.setAttribute('style', 'color: red');
        msgBox.innerHTML = 'INPUT ERROR! Must enter integer';
    }
    function correct() {
        msgBox.setAttribute('style', 'color: green');
        msgBox.innerHTML = 'CORRECT!';
    }
    function incorrect(a) {
        msgBox.setAttribute('style', 'color: red');
        msgBox.innerHTML = 'INCORRECT! The answer is ' + a;
    }

    // Version Selection
    let versionSelection = document.querySelector('#version')
    versionSelection.addEventListener("change", function() {alert(versionSelection.value)});

})