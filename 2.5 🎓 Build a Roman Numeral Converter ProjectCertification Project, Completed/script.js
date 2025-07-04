function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];

    let result = ''

    //* romanNumerals araray index time ko loop pat ml
    for (let i = 0; i < romanNumerals.length; i++) {
        //* pass lyk tae arg ka romanNumerals array yae youk ny tae index ko gte ta ywae pat ml
        //* condition mahn tae kg yae numeral to paung htae ml p yin num ko ae kg yae value nae substract
        while (num >= romanNumerals[i].value) {
            result += romanNumerals[i].numeral
            num -= romanNumerals[i].value
        }
    }

    return result
}

document.getElementById('convert-btn').addEventListener('click', () => {
    const inputElement = document.getElementById('number').value
    const output = document.getElementById('output')

    if (inputElement === '') {
        output.textContent = 'Please enter a valid number'
        return
    }

    const number = parseInt(inputElement)

    if (number < 1) {
        output.textContent = 'Please enter a number greater than or equal to 1'
        return
    }

    if (number >= 4000) {
        output.textContent = 'Please enter a number less than or equal to 3999'
        return
    }

    const romanNumeral = convertToRoman(number)
    output.textContent = convertToRoman(number)
}); 