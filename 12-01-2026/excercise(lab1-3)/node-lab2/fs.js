const fs = require('fs');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error("Error:", err);
        return;
    }
    console.log("File content:", data);

    fs.writeFile('output.txt', 'This is written by Node.js', (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }
        console.log("File written successfully!");
    });
});