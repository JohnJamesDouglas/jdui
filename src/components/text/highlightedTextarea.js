import React, { PropTypes, Component } from 'react'
import classNames from 'classnames'

import './highlightedTextarea.scss'

export default class HighlightedTextarea extends Component {

	static OPEN_MARK = '<mark>'
	static CLOSE_MARK = '</mark>'

	constructor(props) {
		super(props)
		this.state = { value: props.value }
		this._handleInputChange = this._handleInputChange.bind(this)
		this._handleScroll = this._handleScroll.bind(this)
		this.backdrop = React.createRef()
	}

	_handleInputChange(e) {
		this.setState({ value: e.target.value }, this.props.callback(this.props.name, e.target.value))
	}

	_handleScroll(e) {
		const scrollTop = e.target.scrollTop
		this.backdrop.scrollTop = scrollTop
	}

	_handleRegexHighlight(value, payload) {
		return value.replace(payload, HighlightedTextarea.OPEN_MARK + '$&' + HighlightedTextarea.CLOSE_MARK)
	}

	_handleArrayHighlight(value, payload) {
		let offset = 0
		payload.forEach(function (element) {

			// insert open tag
			var open = element[0] + offset

			if (element[2]) {
				const OPEN_MARK_WITH_CLASS = '<mark class="' + element[2] + '">'
				value = value.slice(0, open) + OPEN_MARK_WITH_CLASS + value.slice(open)
				offset += OPEN_MARK_WITH_CLASS.length
			} else {
				value = value.slice(0, open) + HighlightedTextarea.OPEN_MARK + value.slice(open)
				offset += HighlightedTextarea.OPEN_MARK.length
			}

			// insert close tag
			var close = element[1] + offset

			value = value.slice(0, close) + HighlightedTextarea.CLOSE_MARK + value.slice(close)
			offset += HighlightedTextarea.CLOSE_MARK.length

		}, this)
		return value
	}
	getHighlights() {
		let highlightMarks = this.state.value
		const payload = this.props.highlight(highlightMarks)

		// escape HTML
		highlightMarks = highlightMarks.replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt')

		if (payload) {
			switch (payload.constructor.name) {
				case 'Array':
					highlightMarks = this._handleArrayHighlight(highlightMarks, payload)
					break
				case 'RegExp':
					highlightMarks = this._handleRegexHighlight(highlightMarks, payload)
					break
				default:
					throw 'Unrecognized payload type!'
			}
		}

		// this keeps scrolling aligned when value ends with a newline
		highlightMarks = highlightMarks.replace(new RegExp('\\n(' + HighlightedTextarea.CLOSE_MARK + ')?$'), '\n\n$1')

		// highlightMarks = highlightMarks.replace(new RegExp(HighlightedTextarea.OPEN_MARK, 'g'), '<mark>')
		// highlightMarks = highlightMarks.replace(new RegExp(HighlightedTextarea.CLOSE_MARK, 'g'), '</mark>')

		return highlightMarks
	}

	render() {
		const { state: { value }, props: { resize, placeholder }, backdrop, _handleInputChange, _handleScroll } = this
		let textareaClass = classNames({
			'textarea--highlight': true,
			'hwt-input': true,
			'hwt-content': true,
			'textarea--resize': resize
		})
		return (
			<div className="hwt-container">
				<div className="hwt-backdrop" ref={backdrop}>
					<div className="hwt-highlights hwt-content" dangerouslySetInnerHTML={{ __html: this.getHighlights() }} />
				</div>
				<textarea
					className={textareaClass}
					onChange={_handleInputChange}
					onScroll={_handleScroll}
					value={value}
					placeholder={placeholder}
					spellCheck='false'
				/>
			</div>
		)
	}
}