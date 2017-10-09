import React from 'react';
import Autosuggest from 'react-autosuggest';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.searchArray.filter(obj => (obj[this.props.searchKey] !==null) && ((obj[this.props.searchKey].toLowerCase().indexOf(inputValue)) > -1)
    );
  };

  getSuggestionValue = suggestion => suggestion[this.props.searchKey];

// loop through all the keys in array and print
  renderSuggestion = (suggestion) => (
    <a>
      {Object.keys(suggestion).map((elm, i) =>
        <span key={suggestion[this.props.searchKey] + String(i)}>{suggestion[Object.keys(suggestion)[Object.keys(suggestion).length-(Object.keys(suggestion).length-(parseInt(i)))]]
}</span>
      )}
    </a>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search...',
      value,
      onChange: this.onChange,
      type: 'search'
    };

    const renderInputComponent = inputProps => (
      <div className="autosuggestContainer">
        <input {...inputProps} />
        <i></i>
      </div>
    );

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
      />
    );
  }
}

export default SearchBar
