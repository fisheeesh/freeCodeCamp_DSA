const getMean = (array) =>
    array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
    const sorted = array.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
        ? getMean([sorted[mid - 1], sorted[mid]])
        : sorted[mid];
};

const getMode = (array) => {
    const counts = {};
    array.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    });
    if (new Set(Object.values(counts)).size === 1) {
        return null;
    }
    const maxCount = Math.max(...Object.values(counts));
    const mode = Object.keys(counts).filter(key => counts[key] === maxCount);
    return mode.join(", ");
};

const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
};

const getVariance = (array) => {
    const mean = getMean(array);
    return array.reduce((acc, el) => acc + (el - mean) ** 2, 0) / array.length;
};

const getStandardDeviation = (array) => {
    return Math.sqrt(getVariance(array));
};

const calculate = () => {
    const input = document.querySelector("#numbers").value.trim();

    if (!input) {
        alert("Please enter some numbers.");
        return;
    }

    let array;
    if (input.includes(",")) {
        array = input.split(/,\s*/g)
    } else {
        array = input.split('');
    }

    const numbers = array.map(Number).filter(el => !isNaN(el));

    if (numbers.length === 0) {
        alert("Please enter valid numbers.");
        return;
    }

    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);

    document.querySelector("#mean").textContent = mean.toFixed(2);
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode ?? "No mode";
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance.toFixed(2);
    document.querySelector("#standardDeviation").textContent = standardDeviation.toFixed(2);
};