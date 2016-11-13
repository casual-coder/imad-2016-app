

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
      } else if(request.status === 403) {
          alert('Invalid username/password');
      } else if(request.status === 500) {
          alert('Something went wrong!');
          submit.value = 'Login';
      } else{
          alert('Something went wrong!');
          submit.value = 'Login';
      }
    }  
  };
  
  
  
  //Make the request
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://casual-coder.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username:username, password:password}));
  submit.value = 'Logging in...';
};

 var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
