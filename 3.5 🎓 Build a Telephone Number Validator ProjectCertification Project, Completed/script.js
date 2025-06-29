const userInput = document.getElementById('user-input')
const checkBtn = document.getElementById('check-btn')
const clearBtn = document.getElementById('clear-btn')
const resultsDiv = document.getElementById('results-div')

//* 1 555-555-5555, 555-555-5555, 1 555 555 5555
//* 1 (555) 555-5555, (555)555-5555
//* 1(555)555-5555

const validatePhoneNUmber = str => {
    const validatePattens = [
        /\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
        /\s?\(\d{3}\)[\s]?\d{3}-\d{4}$/,
        /\(\d{3}\)\d{3}-\d{4}$/,
    ]

    const trimmed = str.trim();
    //* This code checks if the input starts with a number (like a country code), 
    //* And if that number isn’t 1, it rejects the number because only US numbers (which optionally start with 1) are allowed.
    const countryCodeMatch = trimmed.match(/^(\d+)[\s(]/);
    if (countryCodeMatch && countryCodeMatch[1] !== '1') {
        return false;
    }

    return validatePattens.some(pattern => pattern.test(str))
}

checkBtn.addEventListener('click', () => {
    const phone = userInput.value.trim()
    if (phone === '') {
        alert('Please provide a phone number')
        return
    }

    const isValid = validatePhoneNUmber(phone)
    resultsDiv.textContent = isValid ?
        `Valid US Number: ${phone}` :
        `Invalid US Number: ${phone}`
})

clearBtn.addEventListener('click', () => {
    userInput.value = ''
    resultsDiv.textContent = ''
})