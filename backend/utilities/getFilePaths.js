const fs = require('fs');

// Function to store all the paths of files exist in a folder/directory synchronously
const getFilePaths = (folderPath) => {
    try {
        // Read all file names in the 'uploads' folder synchronously
        const files = fs.readdirSync(folderPath);

        // Array to store file paths
        const filePaths = [];

        // Iterate over each file
        files.forEach((file) => {
            // Access the file using its filename
            const filePath = `${folderPath}/${file}`;
            filePaths.push(filePath);
        });

        return filePaths;
    } catch (err) {
        console.error('Error reading directory:', err);
        return null;
    }
}

module.exports = getFilePaths;
