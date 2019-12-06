import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

class TvShows extends Component {
    constructor() {
        super();
        this.state = {
            apiData: [],
            showsFilteredByDay: [],
            showsFilteredByGenre: [],
            selectedDay: "Monday",
            selectedGenre: "Action",
        }
    }

    componentDidMount() {
        axios({
            url: 'http://api.tvmaze.com/shows',
            method: 'GET',
            "async": true,
            "crossDomain": true,
            dataType: 'json',
        }).then((response) => {
            // console.log(response.data);

            this.setState({
                apiData: response.data
            })
        }).then(() => (
            this.getShows(this.state.apiData, this.state.selectedDay)
        )).catch(() => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        })
    }

    // based on the day currently saved in state, make an API call to retrieve the shows airing then.
    // save the returned data to state as an array of show objects.
    getShows = (showList, dayOfWeek) => {
        let tempArray = [];

        for (let aShow in showList) {
            let broadCastDay = showList[aShow].schedule.days;

            if ( broadCastDay.includes(dayOfWeek) ) {
                if (!showList[aShow].network) {
                    showList[aShow].network = showList[aShow].webChannel;
                }
                tempArray.push(showList[aShow]);
            }
        }

        this.setState({
            showsFilteredByDay: tempArray,
        });
    }

    // when user selects a day, save the day to state
    getDay = (event) => {
        event.preventDefault();
        let newDay = event.target.value;
        this.setState({
            selectedDay: newDay,
        })

        this.getShows(this.state.apiData, newDay);
    }

    // // filter show once the user inputs the genre
    // filteredShow = (event) => {
    //     let filteredArrayGenre = [];
    //     let userGenre = event.target.value;
    //     this.state.showsFilteredByDay.map((data) => {
    //         // console.log(filteredArrayGenre)
    //         return (
    //             data.genres.forEach((genre) => {
    //                 if (genre === userGenre) {
    //                     filteredArrayGenre.push(data)
    //                     // console.log(filteredArrayGenre)
    //                 }
    //                 // } else if (filteredArrayGenre === []) {
    //                 //     console.log(filteredArrayGenre)
    //                 //     Swal.fire({
    //                 //         title: 'Error!',
    //                 //         text: 'Something went wrong!',
    //                 //         icon: 'error',
    //                 //         confirmButtonText: 'Cool'
    //                 //     })
    //                 // }
    //             })
    //         )
    //     })


    //     this.setState({
    //         showsFilteredByGenre: filteredArrayGenre
    //     })
    // }



    renderAllFilteredTvShows = () => {
        // if the first item in showsFilteredByGenre isn't null, we can start the function
        if (this.state.showsFilteredByGenre[0]) {
            // map the array of objects
            return this.state.showsFilteredByGenre.map(show => {
                // for each obj in the arr, filter out only the info we want:
                // TV show title
                // tv show id for key
                // Picture src
                // Link to IMDB page
                // genres from array to string
                // Description of show in html
                // Network name string
                // Scheduled time to play
                let newTvShowObjectToDisplay = {
                    title: show.name,
                    id: show.id,
                    image: show.image.original,
                    imdb: `https://www.imdb.com/title/${show.externals.imdb}`,
                    genres: show.genres.join(" "),
                    summaryHtml: show.summary,
                    network: show.network.name,
                    time: show.schedule.time
                };

                // destructuring the newTvShowObjectToDisplay obj
                const {
                    title,
                    id,
                    image,
                    imdb,
                    genres,
                    summaryHtml,
                    network,
                    time
                } = newTvShowObjectToDisplay;

                // rendering the li
                return (
                    <li key={id}>
                        <button
                            onClick={() => this.props.retrieveTvShowClicked(newTvShowObjectToDisplay)}
                        >
                            <h2>{title}</h2>
                            <img src={image} alt="sorted tv show results" />
                            <a href={imdb}>Go to Imdb</a>
                            <p>Genres: {genres}</p>
                            <p>Network Name: {network}</p>
                            <p>Time: {time}</p>
                            {/* <div>{summaryHtml}</div> */}
                        </button>
                    </li>
                );
            });
        }
<<<<<<< HEAD
      };
    
=======
    };

    // this function parses through the summary html and removes html tags from the string.
    removeTags = (rawString) => {

    }


>>>>>>> 6f448cc8b2bc643177be57c78e9f2be480cb361d
    // filter show once the user inputs the genre
    filteredShow = (event) => {
        let filteredArrayGenre = [];
        let userGenre = event.target.value;
        this.state.showsFilteredByDay.map((data) => {
            return (
                data.genres.forEach((genre) => {
                    if (genre === userGenre) {
                        filteredArrayGenre.push(data)
                        // console.log(filteredArrayGenre)
                    }
                })
            )
        })
        if (!filteredArrayGenre[0]) {
            console.log(filteredArrayGenre, "try")
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong!',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        this.setState({
            showsFilteredByGenre: filteredArrayGenre
        })
    }

    render() {
        // console.log('state: ', this.state);
        return (
            <div>
                <header>
                    <h1> Not So Social </h1>
                </header>

                <div className="dropdownDays">
                    <select name="days" id="days" onChange={this.getDay}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                    </select>

                    <select name="genres" id="genres" onChange={this.filteredShow}>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Anime">Anime</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Romance">Romance</option>
                        <option value="Science-Fiction">Science-Fiction</option>
                        <option value="Thriller">Thriller</option>
                    </select>

                </div>
                <div className="displaySection">
                    <div className="displayInner">
                        <ul className="displayAllFilteredTvShows">{this.renderAllFilteredTvShows()}</ul>
                    </div>
                </div>


            </div >
        )
    }
}

export default TvShows;