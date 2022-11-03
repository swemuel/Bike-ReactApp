let Ride = require('../src/ride');
let LocalStorageMock = require("../storage");
// const window = require('jest-environment-jsdom')

module.exports = class Bike {
    public readonly name: string;
    public brand: string;
    public type: string;
    public datePurchased: Date;
    public allMyRides: any[];

    constructor(newName: string, newBrand: string, newType: string, newDatePurchased: Date) {
        this.name = newName
        this.brand = newBrand
        this.type = newType
        this.datePurchased = newDatePurchased
        this.allMyRides = []
    }

    addRide(newName: string = "Ride", newType: string = "-", newMovingMinutes: number = 0, newDistance: number = 0, newHeartRate: number = 0, newDate: Date, newCals: number = 0) {
        let newRide = new Ride (newName, newType, newMovingMinutes, newDistance, newHeartRate, newDate, newCals)
        this.allMyRides.push(newRide)
    }

    getTotalDistance(): number {
        let result: number = 0
        for (let ride of this.allMyRides) {
             result += ride.distance
        }
        return result
    }

    getMaxDistance(): number {
        let result: number = 0
        for (let ride of this.allMyRides) {
            if (ride.distance > result) {
                result = ride.distance
            }
        }
        return result
    }

    getRideCount(): number {
        let result: number = this.allMyRides.length
        return result
    }

    sortRidesByDistance(): any[] {
		this.allMyRides.sort( function ( a, b ) {
			return b.distance - a.distance
		})
        return this.allMyRides
	}

    getRoadRides(): string {
        let result: string = ""
        for(let aRide of this.allMyRides){
            if(aRide.isRoad()) {
                result += `This ${aRide.type} bike ride was ${aRide.distance} long\n`
            }
        }
        return result
    }

    deleteRide(ride: number): string {
        this.sortRidesByDistance()
        this.allMyRides.splice(ride,1)
        let result: string = ""
        for(let aRide of this.allMyRides){
            result += `Distance: ${aRide.distance}km. Time: ${aRide.movingMinutes} minutes.\n`
        }
        return result
    }

    addSpeed(ride: number) {
        this.sortRidesByDistance() 
        for(let aRide = 0; aRide < this.allMyRides.length; aRide++) {
            let speed: number = this.allMyRides[aRide].calcSpeed().toFixed(2)
            let newSpeed = {averageSpeed: speed}
            Object.assign(this.allMyRides[aRide], newSpeed)
        }
        return this.allMyRides[ride]
    }

    getAllRides(): string {
        let result: string = ""
        let index: number = 0
        for(let aRide of this.allMyRides) {
            result += `${aRide.toString()} Speed: ${this.addSpeed(index).averageSpeed}kmph\n` 
            index += 1
        }
        return result
    }

    totalAverageSpeed() {
        let x: number = 0
        for(let aRide of this.allMyRides) {
            x += aRide.calcSpeed()
        }
        let result = x / this.allMyRides.length
        return parseFloat(result.toFixed(2))
    }

    searchRide(distance: number): string {
        let result: string = ""
        for(let aRide of this.allMyRides) {
            if(aRide.distance === distance) {
                result += aRide.toString() + '\n'
            }
        }
        return result
    }

    updateRide(ride: number, property: string, value: string | number | Date) {
        let backUp: any[] = this.allMyRides
        window.localStorage.setItem("Back Up", JSON.stringify(backUp))

        let myRide = this.allMyRides[ride] 
        myRide[property] = value

        this.saveRides()
        return myRide
    }

    saveRides() {
        let rides: any[] = this.allMyRides
        window.localStorage.setItem("Rides", JSON.stringify(rides))
    }

    loadRidesFromStorage(): string | any[] {
        let storedRides: string | null = window.localStorage.getItem("Rides")
        if (storedRides !== null) {
            let jdata: any[] = JSON.parse(storedRides)
            return jdata
        }
        else {
            return "Nothing in local storage"
        }
    }

    loadBackUp(): string | any[] {
        let storedRides: string | null = window.localStorage.getItem("Back Up")
        if (storedRides !== null) {
            let jdata: any[] = JSON.parse(storedRides)
            return jdata
        }
        else {
            return "Nothing in local storage"
        }
    }

    revertEdits() {
        let allMyRides: any[] | string = this.allMyRides
        allMyRides = this.loadBackUp() 
        return this.allMyRides
    }

    toString() {
        return `Bike Name: ${this.name} - Brand: ${this.brand}`
    }
}