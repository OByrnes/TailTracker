import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import "../components/FormComponents/index.css"

// Imagine you have a list of languages that you'd like to autosuggest.


// Teach Autosuggest how to calculate suggestions for any given input value.


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

// Use your imagination to render suggestions.


const BreedSuggester = ({setbreedId, breeds}) => {
  
    const [value, setValue] = useState('')
    const [suggestions, setSuggestions] = useState([])
    
  const onChange = (event, { newValue }) => {
      setValue(newValue)
      
  };
  

  
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : breeds.filter(breed =>
      breed.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const getSuggestionValue = suggestion => suggestion.name;
  const renderSuggestion = suggestion => (
    <div className="breedSelector__container">
      <img className="breedSelectorImg" src={suggestion.breed_img_url} alt="breed"/>
      <span className="breedSelectorSuggestion">{suggestion.name}</span>
    </div>
  );
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
      setSuggestions(getSuggestions(value))
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
      setSuggestions([])
  };
  const onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    setbreedId(suggestion.id)
  }

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a breed',
      value,
      onChange: onChange
    };
    
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
export default BreedSuggester