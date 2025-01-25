document.getElementById('profile-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('profile-form').style.display = 'block'; // Show the profile form
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the form
});


// Hide the profile form when the "Home" link is clicked
document.getElementById('home-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('profile-form').style.display = 'none'; // Hide the profile form
});

//Hide profile form when back is pressed
document.getElementById('hide-profile').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('profile-form').style.display = 'none'; // Hide the profile form
});


document.getElementById('profile-details-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;

    // Example of sending data to the server
    fetch('http://localhost:3000/api/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileData })
    }).then(response => {
        if (response.ok) {
            alert('Profile saved!');
        } else {
            alert('There was an error saving the profile.');
        }
    });
});



function toggleUsernameInput(checkbox, usernameInput) {
        if (checkbox.checked) {
            usernameInput.style.display = 'block'; // Show input when checkbox is checked
        } else {
            usernameInput.style.display = 'none'; // Hide input when checkbox is unchecked
        }
    }

    // Get checkboxes and username input fields
    const account1Checkbox = document.getElementById('account1');
    const account2Checkbox = document.getElementById('account2');
    const account3Checkbox = document.getElementById('account3');
    const account4Checkbox = document.getElementById('account4');
    const account5Checkbox = document.getElementById('account5');

    const username1Input = document.getElementById('username1');
    const username2Input = document.getElementById('username2');
    const username3Input = document.getElementById('username3');
    const username4Input = document.getElementById('username4');
    const username5Input = document.getElementById('username5');

    // Listen for changes to checkboxes
    account1Checkbox.addEventListener('change', function() {
        toggleUsernameInput(account1Checkbox, username1Input);
    });
    account2Checkbox.addEventListener('change', function() {
        toggleUsernameInput(account2Checkbox, username2Input);
    });
    account3Checkbox.addEventListener('change', function() {
        toggleUsernameInput(account3Checkbox, username3Input);
    });
    account4Checkbox.addEventListener('change', function() {
        toggleUsernameInput(account4Checkbox, username4Input);
    });
    account5Checkbox.addEventListener('change', function() {
        toggleUsernameInput(account5Checkbox, username5Input);
    });



    //saving data for your profile
    document.getElementById('profile-details-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Collect form data
    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;

    // Collect username data for each selected social media platform
    const facebookUsername = document.getElementById('username1').value;
    const twitterUsername = document.getElementById('username2').value;
    const instagramUsername = document.getElementById('username3').value;
    const snapchatUsername = document.getElementById('username4').value;
    const linkedinUsername = document.getElementById('username5').value;

    // Create an object with the collected data
    const profileData = {
        username: username,
        bio: bio,
        socialMedia: {
            facebook: facebookUsername,
            twitter: twitterUsername,
            instagram: instagramUsername,
            snapchat: snapchatUsername,
            linkedin: linkedinUsername
        }
    };

    // Send the data to the server
    fetch('http://localhost:3000/api/save-profile', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
})
    .then(response => {
        if (!response.ok) {
            // If the response isn't OK, throw an error
            console.error('Response not ok:', response.statusText);
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
})
    .then(data => {
        console.log(data);
        if (data.success) {
            alert('Profile saved successfully!');
        } else {
            alert('Error saving profile!');
        }
})
    .catch(error => {
        console.error('Error:', error);
        alert('Network error: ' + error.message);
    });

});
