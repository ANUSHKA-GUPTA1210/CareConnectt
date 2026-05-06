const axios = require("axios");

// Change this to /register or /login to test both
const URL = "http://localhost:5000/api/auth/register";

// The data you want to send
const data = {
    name: "Arpita",
    email: "arpita@gmail.com",
    password: "123456",
    role: "user",
    bloodGroup: "B+",
    city: "Delhi"
};

(async () => {
    try {
        console.log("Sending request to backend...");
        const response = await axios.post(URL, data);
        console.log("Response received:");
        console.log(response.data);
    } catch (error) {
        console.error("Error occurred:");
        if (error.response) {
            // The request was made and server responded with a status code != 2xx
            console.error(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from server:", error.request);
        } else {
            // Something else happened
            console.error(error.message);
        }
    }
})();

