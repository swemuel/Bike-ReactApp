import React from 'react'
import Ride from './Ride'

class Rider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      username: this.props.username,
      allMyRides: JSON.parse(localStorage.getItem('Rides')),
      newRide: [],
      rideName: "",
      rideType: "",
      movingMinutes: "",
      distance: "",
      heartRate: "",
      cals: "",
      userInput: "",
      inputTitle: "Ride Name",
      inputType: "text",
      displayInputBox: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //ADDING THE RIDE AND SAVING IT TO LOCAL STORAGE
  addRide(newrideName, newrideType, newMinutes, newDistance, newHeartRate, newCalories) {
      let aRide = {rideName: newrideName, rideType: newrideType, movingMinutes: newMinutes, distance: newDistance, heartRate: newHeartRate, cals: newCalories}
      this.state.newRide.push(aRide)
      this.saveRide(aRide)
  }

  saveRide(x) {
      let aRide = this.state.newRide
      let existingRides = JSON.parse(localStorage.getItem('Rides'))
      if (existingRides == null) {
        window.localStorage.setItem("Rides", JSON.stringify(aRide))
      }
      else {
        this.state.allMyRides.push(x)
        window.localStorage.setItem("Rides", JSON.stringify(this.state.allMyRides))
      }
      this.sortRidesByDistance()
  }

  //SORT BY FUNCTIONS

  sortRidesByDistance() {
    console.log("sortRidesByDistance called")
    let ridesToSort = JSON.parse(localStorage.getItem('Rides'))
		ridesToSort.sort( function ( a, b ) {
			return b.distance - a.distance
		})
    window.localStorage.setItem("Rides", JSON.stringify(ridesToSort))
    window.location.reload();
	}

  sortRidesByLeastTime() {
    console.log("sortRidesByLeastTime called")
    let ridesToSort = JSON.parse(localStorage.getItem('Rides'))
		ridesToSort.sort( function ( a, b ) {
			return a.movingMinutes - b.movingMinutes
		})
    window.localStorage.setItem("Rides", JSON.stringify(ridesToSort))
    window.location.reload();
	}

  // CALCULATE DISTANCE
  totalDistance() {
    let rides = JSON.parse(localStorage.getItem('Rides'))
    let result = 0
    for (let aRide of rides) {
      result += parseInt(aRide.distance)
    }
    return result
  }

  //Total rides
  numberOfRides() {
    let rides = JSON.parse(localStorage.getItem('Rides'))
    return rides.length
  }

  handleChange(event) {
      this.setState({userInput: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      if (this.state.inputTitle === "Ride Name") {
          this.setState({rideName: this.state.userInput})
          this.setState({inputTitle: "Ride Type (Road/Track)"})
      }
      else if (this.state.inputTitle === "Ride Type (Road/Track)") {
          this.setState({rideType: this.state.userInput})
          this.setState({inputTitle: "Time (minutes)"})
          this.setState({inputType: "number"})
      }
      else if (this.state.inputTitle === "Time (minutes)") {
        this.setState({movingMinutes: this.state.userInput})
        this.setState({inputTitle: "Distance (Kilometers)"})
      }
      else if (this.state.inputTitle === "Distance (Kilometers)") {
        this.setState({distance: this.state.userInput})
        this.setState({inputTitle: "Heart Rate (BPM)"})
      }
      else if (this.state.inputTitle === "Heart Rate (BPM)") {
        this.setState({heartRate: this.state.userInput})
        this.setState({inputTitle: "Calories (kJ)"})
      }
      else if (this.state.inputTitle === "Calories (kJ)") {
          this.setState({cals: this.state.userInput})
          this.setState({inputTitle: "Ride Name"})
          this.setState({inputType: "text"})
          this.setState({displayInputBox: false})
          this.addRide(this.state.rideName, this.state.rideType, this.state.movingMinutes, this.state.distance, this.state.heartRate, this.state.userInput)
          this.setState({allMyRides: JSON.parse(localStorage.getItem('Rides'))})
      }
  }



  render () {
    return (
      <>
      <div id="account-table">
        <h1>My Account</h1>
        <table border='1px'>
        <tbody>
          <tr>
            <th>First Name</th>
            <td>{this.state.firstName}</td>
          </tr>
          
          <tr>
            <th>Last Name</th>
            <td>{this.state.lastName}</td>
          </tr>

          <tr>
            <th>Username</th>
            <td>{this.state.username}</td>
          </tr>
          
        </tbody>
        </table>
      </div>

        {this.state.allMyRides == null ?
           <div id="stats">
           <h1>My Stats</h1>
           <table border='1px'>
           <tbody>
             <tr>
               <th>Total Distance</th>
               <td>-</td>
             </tr>
             
             <tr>
               <th>Number of rides</th>
               <td>-</td>
             </tr>
   
           </tbody>
           </table>
         </div>
          : 
          <div id="stats">
            <h1>My Stats</h1>
            <table border='1px'>
            <tbody>
              <tr>
                <th>Total Distance</th>
                <td>{this.totalDistance()}km</td>
              </tr>
              
              <tr>
                <th>Number of rides</th>
                <td>{this.numberOfRides()}</td>
              </tr>
    
            </tbody>
            </table>
          </div>
        }

        <div id="user-input">
          <h3>Enter {this.state.inputTitle}</h3>
          <form onSubmit={this.handleSubmit}>        
              <label>
                  Name:
                  <input type={this.state.inputType} value={this.state.value} onChange={this.handleChange} required title="Invalid input"/>
                  </label>
                  <input type="submit" value="Submit" />
          </form>
          <button onClick={this.sortRidesByDistance}>Sort by longest distance</button>
          <button onClick={this.sortRidesByLeastTime}>Sort by least time</button>
        </div>
        
        
        
        <div class="box-list">
        <h1 id="rides-heading">My Rides</h1>
        {this.state.allMyRides == null
          ? <Ride allMyRides={[{rideName: "-", rideType: "-", movingMinutes: 0, distance: 0, heartRate: 0, cals: 0}]}/>
          : <Ride allMyRides={JSON.parse(localStorage.getItem('Rides'))} />}
        </div>
      </>
    )
  }
}




export default Rider;
