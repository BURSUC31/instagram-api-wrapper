const fs = require("fs").promises;

async function writeToFile(filePath, data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.appendFile(filePath, jsonString, { flags: "a+" });
    console.log(`Data was successfully written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing to ${filePath}: ${error}`);
  }
}

async function writeFileAsync(data) {
  try {
    await writeToFile("followers.json", data);
    // Any other code you want to run after the file is written.
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

module.exports = writeFileAsync;
