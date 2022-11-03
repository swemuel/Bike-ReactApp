let Bike = require('../src/bike')

module.exports = class Rider {
    public firstName: string;
    public lastName: string;
    public username: string;
    public weight: number;
    public allMyBikes: any[];
    constructor(newFirstName: string, newLastName: string, newUsername: string, newWeight: number) {
        this.firstName = newFirstName
        this.lastName = newLastName
        this.username = newUsername
        this.weight = newWeight
        this.allMyBikes = []
    }

    addBike(newName: string, newBrand: string, newType: string, newDatePurchased: Date) {
        let newBike = new Bike(newName, newBrand, newType, newDatePurchased)
        this.allMyBikes.push(newBike)
    }

    sortByNewest(): any[] {
		this.allMyBikes.sort( function ( a, b ) {
			return b.datePurchased - a.datePurchased
		})
        return this.allMyBikes
	}

    validateBikeName(bikeName: string): string {
        let result = ""
        for(let aBike of this.allMyBikes) {
            if(aBike.name === bikeName) {
                result += aBike.toString() + '\n'
            }
        }
        return result
    }

    toString(): string {
        let result = ""
        this.sortByNewest()
        for(let aBike of this.allMyBikes) {
            let day = aBike.datePurchased.getUTCDate() + 1
            let month = aBike.datePurchased.getUTCMonth() + 1
            let year = aBike.datePurchased.getUTCFullYear()
            
            result += `This bike was purchased on ${day}/${month}/${year}\n`
        }
        return result
    }
}