
function loadLoginForm() {
    var loginHtml = `
        <h3>Login/Register</h3>
        <br/>
        <input type="text" id="username" placeholder="username" />
        <br/><br/>
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="submit_btn" value="Login" />
        <br>
        <input type="submit" id="register_btn" value="Register" />
        `;
         loginHtml = document.getElementById('login_area').innerHTML;
    
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
            request.open('POST', 'http://casual-coder.imad.hasura-app.io/create-user', true);
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify({username: username, password: password}));  
            register.value = 'Registering...';
        };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="http://casual-coder.imad.hasura-app.io/logout">Logout</a>`;
}