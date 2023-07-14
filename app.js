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

// Check if the form is submitted
if (document.querySelector('form').addEventListener) {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Initialize error message variable
    let errorMessage = '';

    // Retrieve form data and perform validation/sanitization
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const reason = document.querySelector('#reason').value.trim();
    const service = document.querySelector('#service').value;
    const consent = document.querySelector('#consent').checked;

    // Perform form validation
    if (name === '') {
      errorMessage = 'Name is required.';
    } else if (email === '') {
      errorMessage = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessage = 'Invalid email format.';
    } else if (reason === '') {
      errorMessage = 'Reason for contact is required.';
    } else if (!consent) {
      errorMessage = 'You must consent to be contacted.';
    }

    // Process the form if there are no errors
    if (errorMessage === '') {
      // Prepare the request data
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('reason', reason);
      formData.append('service', service);
      formData.append('consent', consent);

      // Send a POST request to the server
      fetch('form-handler.php', {
        method: 'POST',
        body: formData,
      })
        .then(function (response) {
          if (response.ok) {
            // Insertion successful
            // Redirect back to the form page with a success query parameter
            window.location.href = 'contact.html?success=true';
          } else {
            // Insertion failed
            // Redirect back to the form page with an error query parameter
            window.location.href = 'contact.html?error=' + encodeURIComponent(
              'Error submitting the form. Please try again.'
            );
          }
        })
        .catch(function (error) {
          console.error('Error:', error);
        });
    } else {
      // Redirect back to the form page with an error query parameter
      window.location.href = 'contact.html?error=' + encodeURIComponent(errorMessage);
    }
  });
}
