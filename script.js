function showSpinner() {
    const statusElement = document.getElementById("status");
    statusElement.innerHTML = '<div class="spinner"></div>';
}

function hideSpinner() {
    const statusElement = document.getElementById("status");
    statusElement.innerHTML = '';
}

function displayError(message) {
    const statusElement = document.getElementById("status");
    statusElement.innerHTML = `<p class="text-red-500">${message}</p>`;
}

async function onGenerateButtonClick() {
    showSpinner();

    const promptInput = document.getElementById("promptInput");
    const promptValue = "A TOK emoji of a " + promptInput.value;
    try {
        const response = await fetch("https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQmxaZFRCeUd3djhOZm9EZU9oT3JxSTk4dDRTRmYtUzhKZlZXMnlvcVlhcGZHeHM3WFZLWmduUXQxcEdHbTYzaUNkaVZPUGVwUGFwVkYxTXc0dXBac1oweVc2Rnc9PQ==", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
              prompt: promptValue, 
              replicateModelVersion: "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e" })
        });

        const data = await response.json();

        if (data.status === 'success') {
            const imageElement = document.getElementById("generatedImage");
            imageElement.src = data.imageUrl;
            document.getElementById("downloadButton").classList.remove("hidden");
        } else {
            console.error('API error:', data);
            displayError('An error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        displayError('An error occurred. Please try again.');
    }

    hideSpinner();
}
function setRandomPrompt() {
    const prompts = ["golden retriever", "watermelon guy", "micheal phelps", "elon musk", "cat", "obama", "michelle obama"];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    document.getElementById("promptInput").value = randomPrompt;
}

function downloadImage() {
    const imageElement = document.getElementById("generatedImage");
    const imageUrl = imageElement.src;

    if (!imageUrl) {
        alert("Please generate an image before downloading.");
        return;
    }

    window.open(imageUrl, '_blank');
}

document.getElementById("generateButton").addEventListener("click", onGenerateButtonClick);
document.getElementById("randomButton").addEventListener("click", setRandomPrompt);
document.getElementById("downloadButton").addEventListener("click", downloadImage);