const Employee = require('../employees.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

    before(async () => {

        try {
        const fakeDB = new MongoMemoryServer();

        const uri = await fakeDB.getConnectionString();

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); //await?

        } catch(err) {
        console.log(err);
        }

    });

    describe('Reading data', () => {
        before(async () => {
          const testDepOne = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          await testDepOne.save();
          const testDepTwo = new Employee({ firstName: 'Angela', lastName: 'Doe', department: 'Testing' });
          await testDepTwo.save();
        });
  
        after(async () => {
          await Employee.deleteMany();
        });
  
        it('should return a proper document by "name" with "findOne" method', async () => {
          const emp = await Employee.findOne({ firstName: 'Amanda' });
          const expectedName = 'Amanda';
          expect(emp.firstName).to.be.equal(expectedName);
        });
    
        it('should return all the data with "find" method', async () => {
            const allEmployees = await Employee.find();
            const expectedLength = 2;
            expect(allEmployees.length).to.be.equal(expectedLength);
          });
  
      }); // end readingData

      describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          await employee.save();
          const savedEmployee = await Employee.findOne({firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          expect(savedEmployee).to.not.be.null;
        });
  
        after(async () => {
          await Employee.deleteMany();
        });
      });

      describe('Updating data', () => {
        beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          await testEmpOne.save();
    
          const testEmpTwo = new Employee({ firstName: 'Angela', lastName: 'Doe', department: 'Testing' });
          await testEmpTwo.save();
        });
    
        afterEach(async () => {
          await Employee.deleteMany();
        });
    
        it('should properly update one document with "updateOne" method', async () => {
          await Employee.updateOne({ firstName: 'Amanda' }, { $set: { firstName: '=Amanda=' }});
          const updatedEmployee = await Employee.findOne({ firstName: '=Amanda=' });
          expect(updatedEmployee).to.not.be.null;
        });
    
        it('should properly update one document with "save" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Amanda' });
          employee.firstName = '=Amanda=';
          await employee.save();
    
          const updatedEmployee = await Employee.findOne({ firstName: '=Amanda=' });
          expect(updatedEmployee).to.not.be.null;
        });
    
        it('should properly update multiple documents with "updateMany" method', async () => {
          await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
          const employee = await Employee.find();
          expect(employee[0].firstName).to.be.equal('Updated!');
          expect(employee[1].firstName).to.be.equal('Updated!');
        });
      });


      describe('Removing data', () => {
        before(async () => {
            const testDepOne = new Employee({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
            await testDepOne.save();
            const testDepTwo = new Employee({ firstName: 'Angela', lastName: 'Doe', department: 'Testing' });
            await testDepTwo.save();
          });
    
        afterEach(async () => {
          await Employee.deleteMany();
        });
    
        it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          const removedEmployee = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          expect(removedEmployee).to.be.null;
        });
    
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Amanda' });
            const removedEmployee = await Employee.findOne({ firstName: 'Amanda' });
            expect(removedEmployee).to.be.null;
          });
    
        it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany();
          const removedEmployee = await Employee.findOne({ firstName: 'Amanda', lastName: 'Doe', department: 'IT' });
          const removedEmployeeTwo = await Employee.findOne({ firstName: 'Angela', lastName: 'Doe', department: 'Testing' });
          expect(removedEmployee).to.be.null;
          expect(removedEmployeeTwo).to.be.null;
        });
      }); //end removingData

    }); //end
