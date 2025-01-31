document.getElementById('profile-link').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('profile-form').style.display = 'block'; // Show the profile form
    window.scrollTo(0, document.body.scrollHeight);// Scroll to the form
});


//checks to see if you have a profile
document.getElementById('profile_checker').addEventListener('click', function(event) {
    event.preventDefault();

    const profile = localStorage.getItem('profile')
    const formTitle = document.getElementById('profile-form-title');
    if (profile){
        formTitle.innerText = 'Edit Your Profile';
        const profileData = JSON.parse(profile);
        document.getElementById('username').value = profileData.username;
        document.getElementById('bio').value = profileData.bio;
        document.getElementById('username1').value = profileData.socialMedia.facebook;
        document.getElementById('username2').value = profileData.socialMedia.twitter;
        document.getElementById('username3').value = profileData.socialMedia.instagram;
        document.getElementById('username4').value = profileData.socialMedia.snapchat;
        document.getElementById('username5').value = profileData.socialMedia.linkedin;

        document.getElementById('profile-form').style.display = 'block'; // Show the profile form
        window.scrollTo(0, document.body.scrollHeight); // Scroll to the form
    }
    else {
        formTitle.innerText = 'Create Your Profile';
        alert("You have not created a profile yet. Please press on the 'create your profile' button")
    }



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

//hides the create profile button when one is created
document.getElementById('account_saved').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('profile-link').style.display = 'none';
});


//updates or creates the profile

document.getElementById('profile-details-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    const username = document.getElementById('username').value;
    const bio = document.getElementById('bio').value;
    const facebookUsername = document.getElementById('username1').value;
    const twitterUsername = document.getElementById('username2').value;
    const instagramUsername = document.getElementById('username3').value;
    const snapchatUsername = document.getElementById('username4').value;
    const linkedinUsername = document.getElementById('username5').value;

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

    // Check if a profile already exists in localStorage
    const existingProfile = localStorage.getItem('profile');

    if (existingProfile) {
        // If a profile exists, update the existing profile in localStorage
        localStorage.setItem('profile', JSON.stringify(profileData));
        alert('Profile updated successfully!');
    } else {
        // If no profile exists, create a new one in localStorage
        localStorage.setItem('profile', JSON.stringify(profileData));
        alert('Profile created successfully!');
    }

    // Optionally, close the form after saving
    document.getElementById('profile-form').style.display = 'none';
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
        console.log('Form submit triggered');
    alert('Form submit triggered');

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

    //save to local storage
    localStorage.setItem('profile',JSON.stringify(profileData));


    console.log("Profile Data: ", profileData);


    // Send the data to the server
    fetch('http://localhost:3001/api/save-profile', {
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


//retrieves profile data and populate content row
document.addEventListener("DOMContentLoaded", function() {
    // Fetch profiles from the backend
    fetch('http://localhost:3001/api/profiles')
        .then(response => response.json())
        .then(profiles => {
            const profileContentRow = document.getElementById('profile-content-row');
            profileContentRow.innerHTML = '';  // Clear the row before adding new profiles

            // Loop through each profile and create a card for each
            profiles.forEach(profile => {
                const profileCard = document.createElement('div');
                profileCard.classList.add('col-md-4', 'mb-5');
                profileCard.setAttribute('data-profile-id', profile.username);  // Store the username in the card

                profileCard.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">${profile.username}</h2>
                            <p class="card-text">${profile.bio}</p>
                        </div>
                        <div class="card-footer">
                            <a class="btn btn-primary btn-sm" href="javascript:void(0);" data-username="${profile.username}">Find ${profile.username}'s Links</a>
                        </div>
                    </div>
                `;

                // Append the card to the content row
                profileContentRow.appendChild(profileCard);
            });

            // Add event listeners to all "Find X's Links" buttons
            const profileButtons = document.querySelectorAll('.card-footer .btn');
            profileButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const username = this.getAttribute('data-username');  // Get the username from the button's data-attribute
                    const profile = profiles.find(p => p.username === username);  // Find the profile by username

                    // Get the profile card element
                    const profileCard = this.closest('.col-md-4');

                    // Modify the profile card content to display detailed information
                    profileCard.innerHTML = `
                        <div class="card h-100">
                            <div class="card-body">
                                <h2 class="card-title">${profile.username}</h2>
                                <p class="card-text">${profile.bio}</p>
                                <p>Facebook: ${profile.socialMedia.facebook}</p>
                                <p>Twitter: ${profile.socialMedia.twitter}</p>
                                <p>Instagram: ${profile.socialMedia.instagram}</p>
                                <p>Snapchat: ${profile.socialMedia.snapchat}</p>
                                <p>LinkedIn: ${profile.socialMedia.linkedin}</p>
                            </div>
                            <div class="card-footer">
                                <a class="btn btn-secondary btn-sm" href="javascript:void(0);" id="back-to-all-profiles">Back to Profile</a>
                            </div>
                        </div>
                    `;

                    // Optionally, hide all other profiles when one is selected
                    const allProfiles = document.querySelectorAll('.col-md-4');
                    allProfiles.forEach(profile => {
                        profile.style.display = 'none';  // Hide all profiles
                    });

                    // Show the selected profile
                    profileCard.style.display = 'block';  // Show the selected profile
                });
            });
        })
        .catch(error => {
            console.error('Error fetching profiles:', error);
        });
});







