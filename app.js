// Check for success parameter on load
if(new URLSearchParams(window.location.search).get('success')) {

    // Show modal
    document.getElementById('success-modal').classList.remove('hidden');

    // Hide after 5 seconds
    setTimeout(() => {
        document.getElementById('success-modal').classList.add('hidden');

        // Reset URL
        window.history.replaceState(null, null, 'contact.html');

    }, 5000);

}

// Click handler to hide modal
document.getElementById('success-modal').addEventListener('click', () => {

    document.getElementById('success-modal').classList.add('hidden');

    window.history.replaceState(null, null, 'contact.html');

});

// Get toggle input and convert to boolean on submit
const toggle = document.getElementById('consent');

toggle.addEventListener('change', (e) => {
    toggle.value = e.target.checked ? 1 : 2;
})