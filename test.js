const fetch = require('node-fetch');
const fs = require('fs');
var FormData = require('form-data');

async function sendFile() {
    try {
        const fileStream = fs.createReadStream('bg-bangkit.png'); // Read the file as a ReadableStream
        const formData = new FormData();
        formData.append('file', fileStream); // Append the file to the FormData object
        const response = await fetch('https://medsafe-cycle.et.r.appspot.com/medicalWaste', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        const type = data.data.category;
        console.log(type);
    } catch (error) {
        console.log(error.message);
    }
}

sendFile();