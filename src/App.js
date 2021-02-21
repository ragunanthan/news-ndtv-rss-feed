import React, { Component, Fragment } from "react";
import "./App.css";



class App extends Component {
  state = {
    data: [],
    content: "",
    link: "",
    title:"",
    categories:"",
    date:""
  };
  Openmodal = (e) => {
    const categorename = e.categories[0].slice(0,1).toUpperCase();
    const categorename1 = e.categories[0].slice(1,e.categories[0].length);
  
    this.setState({content: e.content, link: e.link, title:e.title,date: e.pubDate, categories:categorename+categorename1})
    document.getElementById("createmodal").style.display = "block";
  }
  close = () => {
    
    document.getElementById("createmodal").style.display = "none";
  }
  
  componentDidUpdate(){
    window.onclick = function (event) {
      if (event.target === document.getElementById("createmodal")) {
        document.getElementById("createmodal").style.display = "none";
      }
    };
  }
  
  componentDidMount() {
    var request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.feedburner.com%2Fndtvnews-top-stories",
      true
    );
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        var myObj = JSON.parse(request.responseText);
        this.setState({ data: myObj.items });
        console.log(myObj.items);
      }
    };
  }
  render() {
    return (
      <Fragment>
      <div className="app">
        {this.state.data.length ? (<table className="table">
          <tr className="container">
            <th>No</th>
            <th > NDTV NEWS Titles </th>
          </tr>

          {this.state.data.map((e, key) =>  (
            <tr key={key} >
              <td className="no">{key + 1}.</td>
              <td className="title"><span onClick={() =>  this.Openmodal(e)}>{e.title}</span></td>
            </tr>
          ))}
        </table>) : null}
      </div>

     {/* model for add contact */}
      <div id="createmodal" className="modal">
        <div className="modal-content">
        <div className="modal-content-header">
            <span className="close" onClick={this.close}>
              &times;
            </span>
            <p className="create">{this.state.categories} </p>
          </div>
          <div className="news">
            <p className="news1">Title: {this.state.title}</p>
            <p className="news1">Published on: {this.state.date.slice(0,10)}</p>
            <p className="news2">   {this.state.content}</p>
            <a href={this.state.link}>Read More</a>
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default App;
