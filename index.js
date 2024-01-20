const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const repositoryPath = path.resolve(__dirname, 'your-git-repository'); // Replace with your actual Git repository path

// Function to create a random commit message
const getRandomCommitMessage = () => {
    const messages = [
        'Fix a bug',
        'Add a new feature',
        'Update documentation',
        'Refactor code',
        'Implement a change',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};

const commitAndPush = async () => {
    const git = simpleGit(repositoryPath);

    // Add changes
    await git.add('.');

    // Create a random commit message
    const commitMessage = getRandomCommitMessage();

    // Commit changes
    await git.commit(commitMessage);

    // Push changes
    await git.push('origin', 'main'); // Replace 'main' with your branch name
};

// Check if the Git repository exists
if (fs.existsSync(repositoryPath)) {
    // Change to the repository directory and run commitAndPush function
    process.chdir(repositoryPath);

    // Run the script every 2 minutes
    setInterval(async () => {
        try {
            await commitAndPush();
            console.log('Changes committed and pushed successfully.');
        } catch (error) {
            console.error('Error:', error.message || error);
        }
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
} else {
    console.error('Error: Git repository not found.');
}
