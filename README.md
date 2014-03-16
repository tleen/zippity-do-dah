zippity-do-dah
==============

[![Build Status](https://travis-ci.org/tleen/zippity-do-dah.png?branch=master)](https://travis-ci.org/tleen/zippity-do-dah)

_zippity-do-dah_ is a collection of data and utilities to lookup postal-code based location information.

Functions for looking up zipcode, city, state, latitude and longitude using a zipcode, city + state, or latitude + longitude. You can also get random sets of this data.

Data sourced from [federalgovernmentzipcodes.us](http://federalgovernmentzipcodes.us/). This is **primary** data, meaning data that maps to multiple locations will return only the primary location. 
# Example
```javascript

var zipdb = require('zippity-do-dah');

console.log(zipdb.random());
// {zipcode: '76626', type: 'standard', city: 'Blooming Grove', state: 'TX', latitude: '32.09', longitude: '-96.71' }

console.log(zipdb.zipcode('76626'));
// {zipcode: '76626', type: 'standard', city: 'Blooming Grove', state: 'TX', latitude: '32.09', longitude: '-96.71' }

console.log(zipdb.citystate('Blooming Grove', 'TX'));
// {zipcode: '76626', type: 'standard', city: 'Blooming Grove', state: 'TX', latitude: '32.09', longitude: '-96.71' }

console.log(zipdb.latlong('32.09', '-96.71'));
// {zipcode: '76626', type: 'standard', city: 'Blooming Grove', state: 'TX', latitude: '32.09', longitude: '-96.71' }

```


# API

### .version
Return the version of this library.

## Lookups

All lookups will return an empty object (if lookup was unsuccessful) or object with the following properties:

* zipcode
* type (standard, military, po box)
* city
* state
* latitude
* longitude

These properties may be empty if not applicable to the specific location returned. Each lookup has a synchronous and asynchronous function signature. If the **final argument is a callback function** of the form _function(err, data)_, err will be set if lookup fails. 

### .zipcode(zipcode, [callback])
Lookup data by 5 digit zipcode

### .citystate(city, state, [callback])
Lookup data by city **and** state, capitalization does not matter.

### .latlong(latitude, longitude, [callback])
Lookup date by latitude and longitude, lat/long must have two decimal digits only _(-)xx.xx_.

## Utilities

### .random([number])
Will return a single random result, if number is specified and > 1 will return an array of random results.


