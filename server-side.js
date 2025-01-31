const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());  // Enable CORS for cross-origin requests

// Endpoint to handle saving profile
app.post('/api/save-profile', (req, res) => {
    const profileData = req.body;  // Get the data from the request body
    console.log(profileData);  // Log data to check if it's being received correctly

    const filePath = path.join(__dirname, 'profiles.json');

    // Read the existing profiles or create a new one
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Create a new file if it doesn't exist
                fs.writeFile(filePath, JSON.stringify([profileData], null, 2), 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Error writing new file' });
                    }
                    res.json({ success: true, message: 'Profile saved successfully' });
                });
            } else {
                return res.status(500).json({ success: false, message: 'Error reading file' });
            }
        } else {
            let profiles = [];
            if (data) {
                profiles = JSON.parse(data);  // Parse existing profiles if available
            }

            profiles.push(profileData);  // Add the new profile

            // Write the updated profiles back to the file
            fs.writeFile(filePath, JSON.stringify(profiles, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error writing file' });
                }

                return res.json({ success: true, message: 'Profile saved successfully' });
            });
        }
    });
});

//get profiles form profiles.json
app.get('/api/profiles', (req, res) => {
    fs.readFile(path.join(__dirname, 'profiles.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading profiles file' });
        }
        res.json(JSON.parse(data));
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

