import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
// import SearchForm from "./SearchForm";
// import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    result: [],
    search: "",
  };

  // When this component mounts, search for the movie "The Matrix"
  // componentDidMount() {
  //   API.searchEmployee(query)
  //     .then(res => this.setState({ result: res.data }))
  //     .catch(err => console.log(err));
  // };
  componentDidMount() {
    API.search()
      .then(res => {
        this.setState({ result: res.data })
        console.log(res);
      })
      .catch(err => console.log(err));
  };
    
  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    console.log("working")
  };

  render() {
    return (
    <div>
    <form>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={this.handleInputChange}
          value={this.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For a Employee"
          id="search"
        />
        <br />
        <button onClick={this.handleFormSubmit} className="btn btn-primary">
          Search
        </button>
        </div>
      </form>
      </div>
    )
  }
}

export default SearchResultContainer;
