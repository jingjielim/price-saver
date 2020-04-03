import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import './AutoComplete.scss'

const Autocomplete = ({ name, inputType, classes, placeholder, suggestions = [], submitted }) => {
  // The active selection's index
  const [activeSuggestion, setActiveSuggestion] = useState(0)
  // The suggestions that match the user's input
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  // Whether or not the suggestion list is shown
  const [showSuggestions, setShowSuggestions] = useState(false)
  // What the user has entered
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    if (submitted === true) {
      setUserInput('')
    }
  }, [submitted])

  // Event fired when the input value is changed
  const onChange = e => {
    const userInput = e.currentTarget.value

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    )

    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    setActiveSuggestion(0)
    setFilteredSuggestions(filteredSuggestions)
    setShowSuggestions(true)
    setUserInput(e.currentTarget.value)
  }

  // Event fired when the user clicks on a suggestion
  const onClick = e => {
    // Update the user input and reset the rest of the state
    setActiveSuggestion(0)
    setFilteredSuggestions([])
    setShowSuggestions(false)
    setUserInput(e.currentTarget.innerText)
    // this.setState({
    //   activeSuggestion: 0,
    //   filteredSuggestions: [],
    //   showSuggestions: false,
    //   userInput: e.currentTarget.innerText
    // })
  }

  // Event fired when the user presses a key down
  const onKeyDown = e => {
    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      setActiveSuggestion(0)
      setShowSuggestions(false)
      setUserInput(filteredSuggestions[activeSuggestion])
      // this.setState({
      //   activeSuggestion: 0,
      //   showSuggestions: false,
      //   userInput: filteredSuggestions[activeSuggestion]
      // })

    // User pressed the up arrow, decrement the index
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return
      }
      setActiveSuggestion(activeSuggestion => activeSuggestion - 1)
      // this.setState({ activeSuggestion: activeSuggestion - 1 })

    // User pressed the down arrow, increment the index
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return
      }
      setActiveSuggestion(activeSuggestion => activeSuggestion + 1)
      // this.setState({ activeSuggestion: activeSuggestion + 1 })
    }
  }

  // const {
  //   onChange,
  //   onClick,
  //   onKeyDown,
  //   state: {
  //     activeSuggestion,
  //     filteredSuggestions,
  //     showSuggestions,
  //     userInput
  //   }
  // } = this

  let suggestionsListComponent

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className='suggestions'>
          {filteredSuggestions.map((suggestion, index) => {
            let className

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = 'suggestion-active'
            }

            return (
              <li
                className={className}
                key={suggestion}
                onClick={onClick}
              >
                {suggestion}
              </li>
            )
          })}
        </ul>
      )
    } else {
      suggestionsListComponent = (
        <div className='no-suggestions'>
          <em>{inputType} does not exist. Create in the `{inputType}s` tab.</em>
        </div>
      )
    }
  }

  return (
    <Fragment>
      <input
        required
        name={name}
        className={classes}
        placeholder={placeholder}
        type='text'
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
      />
      {suggestionsListComponent}
    </Fragment>
  )
}

Autocomplete.propTypes = {
  suggestions: PropTypes.instanceOf(Array)
}

export default Autocomplete
