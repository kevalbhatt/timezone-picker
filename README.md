# timezone-picker

timezone-picker is the plugin to select and get timezone value of selected area from WorldMap.


## Demo: http://kevalbhatt.github.io/timezone-picker/
---------------------

![Imgur](http://i.imgur.com/i22GQ74.png?1)


# Installation and usage
---------------------
```sh
npm install --save timezone-picker
```


Include the following lines of code in the section of your HTML.
```js
<script type="text/javascript" src="[yourpath]/jquery.min.js"></script>
<script type="text/javascript" src="[yourpath]/timezone-picker.js"></script>
```

 Select any dom element where you want to create map.

```js
$(selector).timezonePicker();
```

# Options
---------------------
* **width** : (type:number) Sets width of map.
* **height** : (type:number) Sets height of map.
* **defaultCss** : (type:boolean) No need to include css if it is true
* **hoverColor** :(type:string) Shows color on hover
* **selectedColor** :(type:string) Sets selected ** timezone** color
* **mapColor** :(type:string) Sets map color
* **quickLink** :(type:Array of string) Creates shortcuts to select zone ["IST","MST".......]
* **selectBox** :(type:boolean) If it is set tofalse select box will not be created
* **showHoverText** : (type:boolean) If it is set to false hover text will not be shown
* **hoverText**: (type:function | string) text you want to show when you hover on map (works only if showHoverText is true)
* **mapHover** : (type:string) by default it will show hovered polygon(area) on which mouse is pointed (value: timezone, country, zonename)
	* **"timezone"** : when you hover on map it will heighlight all are with same timezone
	* **"country"** : when you hover on map it will heighlight all are with same country code
	* **"zonename"** : when you hover on map it will heighlight all are with same zonename
	

# Methods
---------------------

### .setValue(string,string)
First parameter takes timezone string for example: 'Asia/Kolkata' (zone name). Second parameter is optinal when 1st parameter is zonename

```js
$(selector).data('timezonePicke').setValue('Asia/Kolkata')
```

When you want to pass offset value as 1st parameter 2nd parameter should be 'offset'

```js
$(selector).data('timezonePicke').setValue('5.5','offset')
```

When you want to pass country code as 1st parameter 2nd parameter should be 'country'
```js
$(selector).data('timezonePicke').setValue('IN','country')
```

### .getValue()

It returns object containing timezone details of seleted area:

```js
$(selector).data('timezonePicke').getValue()
```

Sameple returned Object

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

## License
---------------------
It is available under the [MIT LICENSE](LICENSE.md)
