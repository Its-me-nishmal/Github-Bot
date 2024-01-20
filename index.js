const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const localRepositoryPath = 'C:/Test Apis/git bot/Github-Bot'; // Local path to the existing repository

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
    const git = simpleGit(localRepositoryPath);

    try {
        const commitMessage = getRandomCommitMessage();

        // Log the current status
        const status = await git.status();
        console.log('Current status:', status);

        // Create a new file with the commit message
        fs.writeFileSync('commit.txt', commitMessage);

        // Add changes
        await git.add('.');

        // Commit changes
        const commitInfo = await git.commit(commitMessage);
        console.log('Commit info:', commitInfo);

        // Push changes
        const pushInfo = await git.push('origin', 'main'); // Replace 'main' with your branch name
        console.log('Push info:', pushInfo);

        console.log('Changes committed and pushed successfully.');
    } catch (error) {
        console.error('Error during commit and push:', error.message || error);
    }
};

// Check if the Git repository exists
if (!fs.existsSync(localRepositoryPath)) {
    console.error('Error: Git repository not found. Please set up the repository first.');
    process.exit(1);
}

// Change to the repository directory and run commitAndPush function
process.chdir(localRepositoryPath);

// Run the script every 10 seconds
setInterval(async () => {
    try {
        await commitAndPush();
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}, 10 * 1000); // 10 seconds in milliseconds
