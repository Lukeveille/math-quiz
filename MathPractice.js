document.addEventListener('DOMContentLoaded', () => {
  let promptBtn = document.querySelector('#prompts .game-box');
  promptBtn.addEventListener('click', () => {
    var answr = 0;
    var q = 0;
    var score = 0;
    var cancel = false;
    
    //Prompts user to choose type of math problem
    var math = prompt('First, what would you like to do?:\n1 - Addition/Subtraction\n2 - Multiplication\n3 - Division');
    
    //Checking if user hits cancel.
    if (math != null) {
    
        //Converting 'math' to an integer, then checking that it isn't a character.
        var x = parseInt(math);
        var check = x > 0 || x < 0;
    
        //Forcing input between 1 and 3.
        while ((check == false || x < 1 || x > 3) && cancel == false) {
            math = prompt('Please make a selection from 1 to 3:\n1 - Addition/Subtraction\n2 - Multiplication\n3 - Division');
            x = parseInt(math);
            check = x > 0 || x < 0;
    
            if (math == null) {
                cancel = true;
            }
        }
        
        //Prompt user for maximum integer for randomly generated equstions
        var range = prompt('Now please enter the highest integer you want to see:')
        x = parseInt(range);
        check = x > 0 || x < 0;
    
        //Force integer
        while (check == false && cancel == false) {
            range = prompt('Please enter a number:');
            x = parseInt(range);
            check = x > 0 || x < 0;
    
            if (range == null) {
                cancel = true;
            }
        }
        //Prompt user for number of questions
        var num = prompt('Now please enter how many questions you\'d like:')
        y = parseInt(num);
        num = y > 0 || y < 0;
    
        //Force integer
        while (check == false && cancel == false) {
            num = prompt('Please enter a number:');
            y = parseInt(num);
            check = y > 0 || y < 0;
    
            if (num == null) {
                cancel = true;
            }
        }
        //Question loops
        if (math == 1) {
            while (q < y && cancel == false) {
                var addSub = Math.random();
                if (addSub < 0.5) {
                    var rand1 = Math.floor((Math.random() * range) + 1);
                    var rand2 = Math.floor((Math.random() * range) + 1);
                    answr = prompt('What\'s ' + rand1 + ' + ' + rand2 + '?');
                    q++;;
                    if (answr == Number(rand1 + rand2)) {
                        alert('Correct!');
                        score++
                    } else if (answr == null) {
                        cancel = true;
                        q--
                    } else {
                        alert('Incorrect');
                    }
                } else {
                    var rand1 = Math.floor((Math.random() * range) + 1);
                    var rand2 = Math.floor((Math.random() * range) + 1);
                    answr = prompt('What\'s ' + rand1 + ' - ' + rand2 + '?');
                    q++;;
                    if (answr == (rand1 - rand2)) {
                        alert('Correct!');
                        score++
                    } else if (answr == null) {
                        cancel = true;
                        q--
                    } else {
                        alert('Incorrect');
                    }    
                }
            }
        } else if (math == 2) {
            while (q < y && cancel == false) {
                var rand1 = Math.floor((Math.random() * (range - 1)) + 2);
                var rand2 = Math.floor((Math.random() * (range - 1)) + 2);
                answr = prompt('What\'s ' + rand1 + ' x ' + rand2 + '?');
                q++;;
                if (answr == (rand1 * rand2)) {
                    alert('Correct!');
                    score++
                } else if (answr == null) {
                    cancel = true;
                    q--
                } else {
                    alert('Incorrect');
                }
            }
        } else {
            while (q < y && cancel == false) {
                var rand1 = Math.floor((Math.random() * (range - 1)) + 2);
                var rand2 = Math.floor((Math.random() * (range - 1)) + 2);
                var rand3 = rand2 * rand1;
                answr = prompt('What\'s ' + rand3 + ' / ' + rand2 + '?');
                q++;;
                if (answr == (rand1)) {
                    alert('Correct!');
                    score++
                } else if (answr == null) {
                    cancel = true;
                    q--
                } else {
                    alert('Incorrect');
                }
            }
        }
        alert('You scored ' + score + '/' + q + '    ');
    }
  })
})