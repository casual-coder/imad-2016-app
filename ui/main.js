//Counter code
var button = document.getElementById('counter');

button.onclick = function () {
  
  //Create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and stor it in a variable
  request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE ) {
          //Take some action
          if(request.status === 200){
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      //No action
  };
  
  //Make the request
  request.open('GET', 'http://casual-coder.imad.hasura-app.io/counter', true);
  request.send(null);
};

//Submit name
var submit = document.getElementById('submit_btn');
submit.onlick = function () {
    //Create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and stor it in a variable
  request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE ) {
          //Take some action
          if(request.status === 200){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                 }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
          }
      }
      //No action
  };
  
  //Make the request
  var nameInput = document.getElementById('name');
  var name = nameInput.value;
  request.open('GET', 'http://casual-coder.imad.hasura-app.io/submit-name?name=' + name, true);
  request.send(null);

};