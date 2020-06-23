import React, { Component } from "react";
import EmployeeCard from "./EmployeeCard";
// import SearchForm from "./SearchForm";
// import ResultList from "./ResultList";
import API from "../utils/API";

class SearchResultContainer extends Component {
  state = {
    result: [],
    filtered: [],
    search: "",
    order: 1
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
        const result = res.data.results.map(a=> {
          return {fname: a.name.first,lname:a.name.last, ...a}
        })
        this.setState({ result, filtered: result })
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
    this.setState({filtered: this.state.result.filter(a=> a.name.first.toLowerCase().includes(value.toLowerCase()) || a.name.last.toLowerCase().includes(value.toLowerCase()))})
  };

  handleSort = val =>{
    this.setState({
      order: -this.state.order,
      filtered: this.state.filtered.sort((a,b)=> a[val] < b[val] ? -1*this.state.order : a[val]>b[val]? 1*this.state.order:0)})
  }

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
        </div>
      </form>
      <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col"></th>
      <th onClick={()=> this.handleSort("fname")} scope="col">First Name</th>
      <th onClick={()=> this.handleSort("lname")} scope="col">Last Name</th>
      <th onClick={()=> this.handleSort("email")} scope="col">Email</th>
      <th scope="col">Gender</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>
    {this.state.filtered.map(item=> 
      <tr>
      <th scope="row"><img src={item.picture.thumbnail}/></th>
      <td>{item.name.first}</td>
      <td>{item.name.last}</td>
      <td>{item.email}</td>
      <td>{item.gender}</td>
      <td>{item.phone}</td>
    </tr>)}

  </tbody>
</table>
      </div>
    )
  }
}

export default SearchResultContainer;
