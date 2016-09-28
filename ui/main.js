//Counter code
var button = document.getElementById("counter");
var counter = 0;

button.onclick = function () {
    
    //Create a request object
    var request = new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if(request.status === 200) {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //Not Done Yet
    };
    
    //Make a request
    request.open('GET', 'http://casual-coder.imad.hasura-app.io/counter', true);
    request.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
  //Make a request to a server and send the name.
  
  //Capture a list of names and render it as a list
  var names = ['name 1', 'name 2', 'name 3', 'name 4'];
  var list = '';
  for(i=0; i<names.length; i++) {
      list += '<li>' + names[i] + '</li>';
  }
  var ul = document.getElementById('namelist');
  ul.innerHTML = list;
 };