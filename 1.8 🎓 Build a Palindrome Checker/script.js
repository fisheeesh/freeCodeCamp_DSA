const inputEl = document.getElementById('text-input')
const checkBtn = document.getElementById('check-btn')
const resultEl = document.getElementById('result')

function palindromeChekcer() {
    const input = inputEl.value
    resultEl.textContent = ''
    if (input === '') {
        alert('Please input a value')
        return
    }
    //* Remove all non-alphanumeric characters (punctuation, spaces and symbols) 
    //* And turn everything into the same case (lower or upper case) in order to check for palindromes.
    const cleaned = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
    const reversed = cleaned.split('').reverse().join("")

    resultEl.textContent = cleaned === reversed ? `${inputEl.value} is a palindrome` : `${inputEl.value} is not a palindrome`
}

checkBtn.addEventListener('click', palindromeChekcer)

inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        palindromeChekcer()
    }
})