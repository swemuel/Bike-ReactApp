import React from 'react'
import './Cycle.css'



class Ride extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userInput: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.deleteRide = this.deleteRide.bind(this);
  }

  handleChange(event) {
    this.setState({userInput: event.target.value});
  }

  calcSpeed(ride) {
    let x = this.props.allMyRides
    let hours = x[ride].movingMinutes / 60
    return x[ride].distance / hours   
  }

  deleteRide(event) {
    event.preventDefault();
    let rides = JSON.parse(window.localStorage.getItem("Rides"))
    let rideNumber = this.state.userInput - 1
    rides.splice(rideNumber, 1)
    window.localStorage.setItem("Rides", JSON.stringify(rides))
    window.location.reload();
    console.log("deleteRide called")
  }

  deleteAll() {
    let rides = JSON.parse(window.localStorage.getItem("Rides"))
    rides.splice(0, rides.length)
    window.localStorage.setItem("Rides", JSON.stringify(rides))
    window.location.reload();
  }

  render () {
    let x = this.props.allMyRides
    return (
      <>
        <form onSubmit={this.deleteRide}>        
              <label>
                  Ride Number:
                  <input type="number" value={this.state.value} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Delete" />
                  <button onClick={this.deleteAll}>Delete All</button>
          </form>
        <ol>
          {x.map((ride, i) =>
            <li key={i}>
              <div class="box" key={i}>
                    <div class="header">
                      <h2>Name: {ride.rideName} ({ride.rideType})</h2>
                      <h2>Time: {ride.movingMinutes}min</h2>
                    </div>
                    <div class="l-data">
                      <h3>Distance: {ride.distance}km</h3> 
                      <h3>Avg Pace: {this.calcSpeed(i).toFixed(2)}km/ph</h3> 
                    </div>
                    <div class="r-data">
                      <h3>Heart Rate: {ride.heartRate} bpm</h3> 
                      <h3>Calories: {ride.cals}kj</h3> 
                    </div>
              </div>
            </li>
          )}
        </ol> 
      </>
    )
  }
}

export default Ride;
