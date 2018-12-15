function shortenAttributeName(name) {
	let s = name.substring(0, 3)
	s.charAt(0).toUpperCase()
	return s
}

export { shortenAttributeName }