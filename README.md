# timezone-picker

timezone-picker is the plugin to select and get timezone value of selected area(country) from WorldMap.

[![NPM version](https://badge.fury.io/js/timezone-picker.svg)](https://www.npmjs.com/package/timezone-picker)
[![NPM Dependency](https://david-dm.org/kevalbhatt/timezone-picker.svg)](https://www.npmjs.com/package/timezone-picker)
[![](https://data.jsdelivr.com/v1/package/npm/timezone-picker/badge)](https://www.jsdelivr.com/package/npm/timezone-picker)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)]()
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/kevalbhatt/timezone-picker/issues)
[![HitCount](http://hits.dwyl.com/kevalbhatt/timezone-picker.svg)](http://github.com/kevalbhatt/timezone-picker)


### Live Demo: http://kevalbhatt.github.io/timezone-picker/
---------------------

![Imgur](https://i.imgur.com/YrGdPv2.png)

# Dependency
---------------------
* moment-timezone
* jquery
* select2 (optional)


# Installation
---------------------

### Use package Using npm

```sh
npm install --save timezone-picker
```
or 

### Use package Using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/timezone-picker@2.0.0-0/timezone-picker.min.js"></script>
```

Include the following lines of code in the section of your HTML.

```html
<link href="[yourpath]/select2.min.css" rel="stylesheet"> <!-- Optional -->
<link href="[yourpath]/dist/styles/timezone-picker.css" rel="stylesheet">
<script type="text/javascript" src="[yourpath]/moment-timezone.js"></script> 
<script type="text/javascript" src="[yourpath]/jquery.js"></script>
<script type="text/javascript" src="[yourpath]/select2"></script> <!-- Optional -->
<script type="text/javascript" src="[yourpath]/dist/timezone-picker.min.js"></script>
```


# Usage
---------------------

## Select any dom element where you want to create the map.

```js
$(selector).timezonePicker();
```

## defaultValue

Set a custom value on load

If defaultValue is null then system timezone is selected

* ### Select value based on zonename.

```js
$(selector).timezonePicker({ defaultValue: { value: "EAT", attribute: "zonename" }});
```

* ### Select value based on country code.

```js
$(selector).timezonePicker({ defaultValue: { value: "IN", attribute: "country" }});
```

* ### Select value based on timezone.

```js
$(selector).timezonePicker({ defaultValue: { value: "Asia/Calcutta", attribute: "timezone" }});
```

* ### Select value based on offset.

```js
$(selector).timezonePicker({ defaultValue: { value: "5.5", attribute: "offset" }});
```

## quickLink

You can create custom shortcuts link using quickLink options.

```js
$(selector).timezonePicker({
    quickLink: [{
        "IST": "IST",
        "LONDON": "Europe/London"
    }]
});
```

* "LONDON": This key is used as a display string for shortcut button.
* "Europe/London": This value is used when user click on a button and based on value, map is highlighted


Example: 

You can pass following value.

* **timezone** : Europe/London
* **zonename** : GMT
* **country code** : GB

```js
$(selector).timezonePicker({
    quickLink: [{
        "LONDON1": "Europe/London"
    }]
});

$(selector).timezonePicker({
    quickLink: [{
        "LONDON2": "GB"
    }]
});

$(selector).timezonePicker({
    quickLink: [{
        "LONDON3": "GMT"
    }]
});

$(selector).timezonePicker({
    quickLink: [{
        "GMT": "GMT"
    }]
});
```

## hoverText

```js
$(selector).timezonePicker({
    hoverText: function(e, data){
        return (data.timezone + " (" + data.zonename + ")");
    }
});
```

## quickLinkClass

Class name for the quickLink container.

```js
$(selector).timezonePicker({
    quickLinkClass: "quick-class"
});
```

**Output**

```diff
<div class="filter-box">
    <select class="country-lov select-class"></select>
+    <div class="quick-link quick-class"></div>
    <div class="hover-text"></div>
</div>
```
## selectClass

Class name for the country drop-down.

```js
$('body').timezonePicker({
    selectClass: "select-class"
});
```
**Output**

```diff
<div class="filter-box">
+    <select class="country-lov select-class"></select>
    <div class="quick-link"></div>
    <div class="hover-text"></div>
</div>
```

## filterBoxClass

Class name for the filter box container.

```js
$('body').timezonePicker({
    filterBoxClass: "filter-class"
});
```
**Output**

```diff
+<div class="filter-box filter-class">
    <select class="country-lov"></select>
    <div class="quick-link"></div>
    <div class="hover-text"></div>
</div>
```

## hoverTextClass

Class name for the hover text container.

```js
$('body').timezonePicker({
    hoverTextClass: "hover-class"
});
```
**Output**

```diff
<div class="filter-box">
    <select class="country-lov"></select>
    <div class="quick-link"></div>
+    <div class="hover-text hover-class"></div>
</div>
```

# Options
---------------------

| Parameter | Type | Default | Description |
| :---------|:---- |:--------|:----------- | 
| **width** | `Number` | `500` | width of map |
| **height** | `Number` | `250` | height of map |
| [**defaultValue**](#defaultvalue) | `Object` | System timezone | Set custome value on load `{ value: "EAT", attribute: "zonename" }` |
| [**quickLink**](#quicklink) | `Array<Object>` | `[{"IST": "IST","LONDON": "Europe/London"}]` | Creates shortcuts to select zone |
| [**quickLinkClass**](#quicklinkclass) | `String` | `quick-link` | quickLinkClass will be appended with the default value |
| [**filterBoxClass**](#filterboxclass) | `String` | `filter-box` | filterBoxClass will be appended with the default value |
| **selectBox** | `Boolean` | `true` | If it is set to false select box will not be created |
| [**selectClass**](#selectclass) | `String` | `country-lov` | selectClass is appended with the default value |
| **showHoverText** | `Boolean` | `true` | If it is set to false hover text will not be shown |
| [**hoverText**](#hovertext) | `Function` | `timezone(zonename)` | Called on hover of country (works only if showHoverText is true) |
| [**hoverTextClass**](#hovertextclass) | `String` | `hover-text` | hoverTextClass is appended with the default value |
| **hoverTextEl** | `Jquery selector` | `Appened in filter-box` | hover text element is appended in selector |
| **mapHoverType**  | `String` | hover polygon(area) | by default it will show hovered polygon(area) on which mouse is pointed [other hover options](#maphovertype-options) |



### mapHoverType options
| Parameter | Type | Description |
| :---------|:---- |:----------- | 
| **timezone** | `String`| when you hover on the map it will highlight all country with the same timezone
| **country** | `String`| when you hover on the map it will highlight all country with same country code |
| **zonename** | `String`| when you hover on the map it will highlight all country with the same zone name |
    

# Methods
---------------------

### .setValue(value[String-required],attribute[String-optional])

Select the value(country) based on value and attribute parameter.


* Set timezone string as a first parameter for example: 'Asia/Kolkata'.
* Default attribute is "timezone";

```js
$(selector).data('timezonePicker').setValue('Asia/Kolkata')
```

* If you want to set value based on offset then set the 1st parameter as an offset string("5.5") and 2nd parameter to 'offset'

```js
$(selector).data('timezonePicker').setValue('5.5','offset')
```

* If you want to set value based country code then set the 1st parameter as country code and 2nd parameter to 'country'

```js
$(selector).data('timezonePicker').setValue('IN','country')
```

* If you want to set value based zonename then set the 1st parameter as zonename(IST) and 2nd parameter to 'zonename'

```js
$(selector).data('timezonePicker').setValue('IST','zonename')
```

### .getValue()

It returns object containing timezone details of seleted area:

```js
$(selector).data('timezonePicker').getValue()
```

Sample returned Object

```js
  [
    {
        "selected":true,
        "zonename":"IST",
        "offset":5.5,
        "pin":"361,115",
        "country":"LK",
        "timezone": "Asia/Colombo",
    },
    {
        "zonename":"IST",
        "offset":5.5,
        "pin": "373,94",
        "country":"IN",
        "timezone": "Asia/Kolkata",
    }
]
``` 

### .getSystemTimezone()

It returns an object containing system timezone details.

### .getTimeZoneObject(value[String-required],attribute[String-optional])

It returns an object containing timezone details based on value and attribute.

* Get timezone `Object` using timezone string example: 'Asia/Kolkata'.
* Default attribute is "timezone";

```js
$(selector).data('timezonePicker').getTimeZoneObject('Asia/Kolkata');
```

* If you want to get Object based on offset then set the 1st parameter as an offset string("5.5") and 2nd parameter to 'offset'

```js
$(selector).data('timezonePicker').getTimeZoneObject('5.5','offset');
```

* If you want to get Object based country code then set the 1st parameter as country code and 2nd parameter to 'country'

```js
$(selector).data('timezonePicker').getTimeZoneObject('IN','country');
```

* If you want to get Object based zonename then set the 1st parameter as zonename(IST) and 2nd parameter to 'zonename'

```js
$(selector).data('timezonePicker').getTimeZoneObject('IST','zonename');
```

### .getZoneName(value[String-required],attribute[String-optional])

It returns an zonename based on value and attribute.

* Get zonename `String` using timezone string example: 'Asia/Kolkata'.
* Default attribute is "timezone";

```js
$(selector).data('timezonePicker').getZoneName('Asia/Kolkata');
```

* If you want to get zonename based on offset then set the 1st parameter as an offset string("5.5") and 2nd parameter to 'offset'

```js
$(selector).data('timezonePicker').getZoneName('5.5','offset');
```

* If you want to get zonename based country code then set the 1st parameter as country code and 2nd parameter to 'country'

```js
$(selector).data('timezonePicker').getZoneName('IN','country');
```


### .getTimeZoneString(value[String-required],attribute[String-optional])

It returns an timezone string based on value and attribute.

* Get timezone `String` using country code example: 'IN'.
* Default attribute is "country";

```js
$(selector).data('timezonePicker').getZoneName('IN');
```

* If you want to get timezone string based on offset then set the 1st parameter as an offset string("5.5") and 2nd parameter to 'offset'

```js
$(selector).data('timezonePicker').getTimeZoneString('5.5','offset');
```

* If you want to get timezone string based zonename then set the 1st parameter as zonename(IST) and 2nd parameter to 'zonename'

```js
$(selector).data('timezonePicker').getTimeZoneString('IST','zonename');
```

# Events
---------------------

## map:loaded

As soon as the map is loaded and ready the **map:loaded** is fired.
To catch it you can use:
```
$(selector).on("map:loaded" , function(){
    console.log("Map is loaded, have fun!");
});
```

## map:value:changed

Whenever the value of the timezone changes, the event **map:value:changed** is fired.
To catch it you can use:
```
$(selector).on("map:clicked" , function(){
    console.log($(selector).data('timezonePicker').getValue());
});
```


## map:country:clicked

Event **map:country:clicked** is fired, when a user clicks on the country.
To catch it you can use:
```
$(selector).on("map:country:clicked" , function(){
    console.log($(selector).data('timezonePicker').getValue());
});
```

## map:quickLink:clicked

Event **map:quickLink:clicked** is fired, when a user clicks on the quickLink button.
To catch it you can use:
```
$(selector).on("map:quickLink:clicked" , function(){
    console.log($(selector).data('timezonePicker').getValue());
});
```

## map:option:changed

Event **map:option:changed** is fired, when a user changes the value from the country drop-down.
To catch it you can use:
```
$(selector).on("map:option:changed" , function(){
    console.log($(selector).data('timezonePicker').getValue());
});
```

## License
---------------------
It is available under the [MIT LICENSE](LICENSE.md)
