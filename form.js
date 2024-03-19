function createAlert(type, message) {
    var alert = document.createElement('div');
    alert.className = 'alert ' + type;
    alert.textContent = message;
    return alert;
}

// Form submission event listener
document.getElementById('course-evaluation-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from being submitted normally

    // Clear old alerts
    var oldAlerts = document.querySelectorAll('.alert');
    oldAlerts.forEach(function(alert) {
        alert.remove();
    });

    var allFieldsFilled = true;

    // Check if text fields are filled
    var textInputs = document.querySelectorAll('input[type="text"], textarea');
    textInputs.forEach(function(input) {
        if (input.value.trim() === '') {
            allFieldsFilled = false;
            input.style.borderColor = 'red';
        } else {
            input.style.borderColor = '';
        }
    });

    // Check if ratings are selected
    var ratingGroups = ['objectives-clear', 'clear-communication', 'manageable-workload'];
    ratingGroups.forEach(function(group) {
        var buttons = document.getElementsByName(group);
        var isChecked = false;
        buttons.forEach(function(button) {
            if (button.checked) isChecked = true;
        });
        if (!isChecked) allFieldsFilled = false;
    });

    // Create alert
    var alert;
    if (allFieldsFilled) {
        alert = createAlert('success', 'Thank you for your feedback!');
        // Clear the form if all fields were filled
        textInputs.forEach(function(input) {
            input.value = '';
        });
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function(button) {
            button.checked = false;
        });
    } else {
        alert = createAlert('error', 'Please fill in all required fields.');
    }

    // Display alert at the bottom of the form
    var form = document.getElementById('course-evaluation-form');
    form.appendChild(alert);
});


