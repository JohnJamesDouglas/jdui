function roll(max) { return (Math.floor(Math.random() * max) + 1) }

export { roll }

function clamp(val, min, max) { return Number (val > max ? max : val < min ? min : val) }

export { clamp }

function calcAttributeModifier(val) { return (Math.floor((val - 10) / 2)) }

export { calcAttributeModifier }

function calcNumTempBars(current, max, temp) { return (temp / max) }

export { calcNumTempBars }
