import React, { Component } from "react";
import TvShows from "./TvShows";
// import FirebaseDatabase from "./FirebaseDatabase";
// import DisplayResultDashboard from "./DisplayResultDashboard";
// import CreateNewEvent from "./CreateNewEvent";
import Header from "./Header";
import Footer from "./Footer";

class MainPage extends Component {
  constructor() {
    super();
    this.state = {
      eventClicked: null,
      tvShowClicked: null
    };
  }

  render() {
    return (
        <div>
      <body>
        {/* a functional component that renders the header */}
        <Header />
        <main>
          {/* get tvShows from tvMaze api and has a call back to set state on this component with a single tv show selected by use via onClick */}
          <TvShows />
          {/* a form consist of inputs that allows user to create new events and display onto the page, also sends the information to firebase database */}
          {/* gets all events json object from firebase and render the page with those events in an ul element as a button, has a callback function that retrieves the event obj user selected via onClick, and sets the state with that event obj */}
          {/* once the state is set with both the user selected event and tv show, render the results at the end of the page */}
        </main>
        {/* footer, am I repeating myself? */}
        <Footer />
      </body>
        </div>
    );
  }
}

export default MainPage;
