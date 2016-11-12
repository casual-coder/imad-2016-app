

//Submit username, password
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //Create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and stor it in a variable
  request.onreadystatechange = function () {
      if(request.readyState === XMLHttpRequest.DONE ) {
          //Take some action
          if(request.status === 200){
             console.log('User logged in');
             alert('Logged in successfully');
      }else if(request.status === 403) {
          alert("Invalid username/password");
      }else if(request.status === 500) {
          alert("Something went wrong!");
      }
    }  //No action
  };
  
  //Make the request
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://casual-coder.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username:username, password:password}));

};