module.exports = class Ride {
    public name: string;
    public type: string;
    public movingMinutes: number;
    public distance: number;
    public heartRate: number;
    public date: Date;
    public cals: number;

    constructor(newName: string, newType: string, newMovingMinutes: number, newDistance: number, newHeartRate: number, newDate: Date, newCals: number) {
        this.name = newName
        this.type = newType
        this.movingMinutes = newMovingMinutes
        this.distance = newDistance
        this.heartRate = newHeartRate
        this.date = newDate
        this.cals = newCals
    }

    isRoad(): boolean {
        if(this.type === "Road") {
            return true
        }
        else {
            return false
        }
    }

    calcSpeed(): number {
        let hours: number = this.movingMinutes / 60
        return this.distance / hours   
    }

    toString(): string {
        return `Title: ${this.name} - Distance: ${this.distance}km -`
    }
}