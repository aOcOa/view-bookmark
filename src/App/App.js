import React, { Component } from 'react';
import './App.css';
import Upload from '../Upload/Upload';
import Content from '../Content/Content';

class App extends Component {
  constructor(){
    super();
    this.getDomElement = this.getDomElement.bind(this);
    this.state =  {
      bookmarkDom: []
    }
  }
  getDomElement(bookmarkDom){
    this.setState({ bookmarkDom });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Visualize google bookmark</h2>
          <p>This is a unfinished experiment and works not so ideal, it's pure client site,
           it means don't try it if you have limit in network traffic.</p>
        </div>
        <Upload getDomElement={ this.getDomElement }/>
        { this.state.bookmarkDom.length 
          ? <Content bookmarkDom={this.state.bookmarkDom} />
          : <h1>No Bookmark Here</h1>
        }
      </div>
    );
  }
}

export default App;
