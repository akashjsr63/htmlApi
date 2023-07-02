const hbs = require('hbs');

const lt = hbs.registerHelper('lt', function (a, b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    if (a < b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  
const gt = hbs.registerHelper('gt', function (a, b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    if (a > b) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  
  const isEq = hbs.registerHelper('isEq', function (a, b, options) {
    if (a == b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  
 const sum=  hbs.registerHelper('sum', function (a,b, options) {
    if(a==NaN || a== undefined) return 1;
    if(b==NaN || b== undefined) return 1;
    return a+b;
  });

const localTime = hbs.registerHelper('localTime', function(timestamp) {
const timestamp1 = timestamp * 1000; // Convert seconds to milliseconds

// Create a new Date object using the timestamp
const date = new Date(timestamp1);
const localDay = date.getDate().toString().padStart(2, '0');
const localMonth = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so adding 1
const localYear = date.getFullYear().toString();
const localHours = date.getHours();
const localMinutes = date.getMinutes().toString().padStart(2, '0');
const localSeconds = date.getSeconds().toString().padStart(2, '0');

// Determine AM or PM
const amOrPm = localHours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
const formattedHours = (localHours % 12) || 12;

// Assemble the local time string
const localTimeString = `${localDay}/${localMonth}/${localYear} ${formattedHours}:${localMinutes}:${localSeconds} ${amOrPm}`;

return localTimeString;
});

  
  module.exports = {
    gt,lt,sum, isEq, localTime
  };