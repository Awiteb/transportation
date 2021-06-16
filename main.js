#!/usr/bin/node

class Vehicle{
    #company;
    #name;
    static id = 1;
    static carArray = [];
    static planeArray = [];
    constructor(name, company){
        this.company = company;
        this.name = name;
        this.id = Vehicle.id++;
        let ob = {
            name:this.name,
            company:this.company,
            id:this.id
        }
        this instanceof Car
            ? Vehicle.carArray.push(ob)
            : Vehicle.planeArray.push(ob);
    }
    set company(companyName){
        if (companyName.length > 4){
            this.#company = companyName;
        } else{
            console.error("Invalid name", companyName);
        }
    }
    get company(){
        return this.#company;
    }
    set name(newName){
        if (newName.length > 3){
            this.#name = newName;
        } else{
            console.error("Invalid name", newName);
        }
    }
    get name(){
        return this.#name;
    }
}

class Employee{
    static id = 1
    static carArray = [];
    static planeArray = [];
    constructor(employeeName, employeeBirth){
        this.name = employeeName;
        this.birth = employeeBirth;
        this.id = Employee.id++;
        let ob = {
            name:this.name,
            birth:this.birth,
            id:this.id
        }
        this instanceof CarDriver
            ? Employee.carArray.push(ob)
            : Employee.planeArray.push(ob);
    }
}

class Reserved{
    static id = 1;
    static reservedArray = [];
    makeReserved(employeeId, vehicleId){
        let reservationDate = new Date().toLocaleString('en-US');
        let reservationID = Reserved.id++;
        if (this.compatible(employeeId, vehicleId)){
            Reserved.reservedArray.push(this.reserved(reservationDate, reservationID,
                                                        employeeId, vehicleId))
        } else{
            console.log("The driver of the vehicle is not compatible with the vehicle");
        }
    }
    compatible(employeeId, vehicleId){
        let vehicleCarids = Vehicle.carArray
        .map(car => car.id);
        let vehiclePlaneids = Vehicle.planeArray
        .map(plane => plane.id);
        let employeeCarids = Employee.carArray
        .map(employee => employee.id);
        let employeePlaneids = Employee.planeArray
        .map(employee => employee.id);
        return vehicleCarids.includes(vehicleId) && employeeCarids.includes(employeeId)
            ? true
            : vehiclePlaneids.includes(vehicleId) && employeePlaneids.includes(employeeId)
                ? true
                : false;
    }
    reserved(reservationDate, reservationID, employeeId, vehicleId) {
        let [employee, employeeType] = this.getEmployee(employeeId);
        let [vehicle, vehicleType] = this.getVehicle(vehicleId);
        return {
            reservationID:reservationID,
            reservationDate:reservationDate,
            type:vehicleType,
            employeeName:employee.name,
            employeeID:employee.id,
            vehicleName:vehicle.name,
            vehicleCompany:vehicle.company,
            vehicleID:vehicle.id
        }
    }
    getEmployee(employeeId) {
        return Employee.carArray.find(emp => emp.id == employeeId) != undefined
            ? [Employee.carArray.find(emp => emp.id == employeeId), 'car']
            : [Employee.planeArray.find(emp => emp.id == employeeId), 'plane']
    }
    getVehicle(vehicleId){
        return Vehicle.carArray.find(vehicle => vehicle.id == vehicleId) != undefined
            ? [Vehicle.carArray.find(vehicle => vehicle.id == vehicleId), 'car']
            : [Vehicle.planeArray.find(vehicle => vehicle.id == vehicleId), 'plane']
    }
    static display(){
        let text='';
        Reserved.reservedArray.forEach(reserved => {
            let reserv = `
                        \rReservation id: ${reserved.reservationID}.
                        \rReservation date: ${reserved.reservationDate}.
                        \rReservation type: ${reserved.type}.
                        \rDriver name: ${reserved.employeeName}.
                        \rDriver id: ${reserved.employeeID}.
                        \rVehicle name: ${reserved.vehicleName}.
                        \rVehicle company: ${reserved.vehicleCompany}.
                        \rVehicle id: ${reserved.vehicleID}
                        \r`
            text+=reserv;
        })
        return text;
    }
}

class Car extends Vehicle {
    #carType;
    addCarType(carType){
        this.carType = carType;
        this.type = "car";
        return this;
    }
    set carType(carType){
        if (['gas', 'electric'].includes(carType)){
            this.#carType = carType;
        } else{
            console.error("Invalid car type must be gas or electric not", carType);
        }
    }
    get carType() {
        return this.#carType;
    }
}

class Plane extends Vehicle {
    addPlaneType(planeType){
        this.planeType = planeType;
        this.type = "plane";
        return this;
    }
}

class CarDriver extends Employee{
    addLicense(licenseID){
        this.licenseID = licenseID;
        return this;
    }
}

class PlaneDriver extends Employee{
    addLicense(licenseID){
        this.licenseID = licenseID;
        return this;
    }
}

let car1 = new Car("camre", 'rrerre').addCarType('gas');
let car2 = new Car("corela", 'rrerre').addCarType('gas');
let car3 = new Car("mmki", 'rrerre').addCarType('gas');
let plane1 = new Plane('nfeu', "wienw").addPlaneType('efefefe');
let plane2 = new Plane('nfeu', "wienw").addPlaneType('defef');
let plane3 = new Plane('nfeu', "wienw").addPlaneType('defefde');

carDriver1 = new CarDriver("Aweew", "93/2/32").addLicense(21213);
carDriver2 = new CarDriver("frgrh", "94/2/32").addLicense(5432);
carDriver2 = new CarDriver("fmoefme", "95/2/32").addLicense(92382);
planeDriver1 = new PlaneDriver("wrwfw", "81/12/3").addLicense(8373);
planeDriver2 = new PlaneDriver("mkmkmk", "99/12/3").addLicense(4383);
planeDriver3 = new PlaneDriver("wrwfw", "98/12/3").addLicense(101920);

let reserved = new Reserved();

reserved.makeReserved(1, 1);
reserved.makeReserved(2, 4);
reserved.makeReserved(3, 3);
reserved.makeReserved(4, 5);
reserved.makeReserved(5, 2);
reserved.makeReserved(6, 6);

console.log(Reserved.display());