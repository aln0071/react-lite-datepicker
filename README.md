# react-lite-datepicker
A simple react date picker.

***USAGE***

**Step 1: Install the module**

Run:

`npm install react-lite-datepicker --save`

**Step 2: Import the module**

Add following line to import the module:

`import DatePicker from 'react-lite-datepicker';`

**Step 3: Use the module**

Basic implementation is as follows:
```
<DatePicker
  label = "Choose a date"
  required = { true }
  onChange = { (date) => { console.log( date ) }
  disabled = { false }
  limit = "2025-04-22"
/>
```

### Change log :
- ***disabled*** flag added
- ***limit*** added
	- this value prevents user from selecting a date preceding the limit
	- should be a string with format: ***yyyy-mm-dd***
- bugs in code fixed