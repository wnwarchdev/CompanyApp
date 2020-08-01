
const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');


describe('Employees', () => {

    it('should throw an error if there is no "firstName"', () => {
        const emp = new Employees({});
        emp.validate(err => {
          expect(err.errors.firstName).to.exist;
        });
      });


    it('should throw an error if there is no "lastName"', () => {
        const emp = new Employees({});
        emp.validate(err => {
          expect(err.errors.lastName).to.exist;
        });
      });


    it('should throw an error if there is no "department"', () => {
        const emp = new Employees({});
        emp.validate(err => {
          expect(err.errors.department).to.exist;
        });
      });

    it('should throw an error if "firstName" is not a string', () => {
        const cases = [{}, [], 123];
        for(let arg of cases) {
          const emp = new Employees({ arg });
          emp.validate(err => {
            expect(err.errors.firstName).to.exist;
          });
        }
      });

    it('should throw an error if "lastName" is not a string', () => {
        const cases = [{}, [], 123];
        for(let arg of cases) {
          const emp = new Employees({ arg });
          emp.validate(err => {
            expect(err.errors.lastName).to.exist;
          });
        }
      });

    it('should throw an error if "department" is not a string', () => {
        const cases = [{}, [], 123];
        for(let arg of cases) {
          const emp = new Employees({ arg });
          emp.validate(err => {
            expect(err.errors.department).to.exist;
          });
        }
      });

    it('should not throw an error if input is okay', () => {
      const emp = new Employees({firstName: 'John', lastName: 'Doe', department: 'IT'});
          emp.validate(err => {
            expect(err).to.not.exist;
          });      
        });

      after(() => {
        mongoose.models = {};
      });
  });
