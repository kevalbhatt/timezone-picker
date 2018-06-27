/**
 * @version: v2.0.0-0
 * @author: Keval Bhatt 
 * @copyright: Copyright (c) 2015 Keval Bhatt. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://kevalbhatt.github.io/timezone-picker/
 */

const findValue = function(key, value, data) {
    var referObj = [];
    var obj = data.filter(function(object) {
        if (object[key] === value) {
            referObj.push($.extend(true, {}, object));
            return object;
        }
    });
    for (var i = 0; i < referObj.length; i++) {
        delete referObj[i].points;
        delete referObj[i].pin;
    }
    return referObj;
}


/**
 * [generateElement description]
 * @param  {[Jquery Object]}  element     [selector]
 * @param  {[type]}  attr [description]
 * @param  {[javascript Object or text]}  chilled      [If we pass javascript object or  array it will append all chilled and if you pass string it will add string(value) inside element ]
 * @param  {Boolean} isSvg       [If it is svg then it will create svg element]
 * @return {[type]}              [description]
 */
const generateElement = function({ element, attr, chilled = false, isSvg = false }) {
    if (isSvg) {
        var elementObject = document.createElementNS('http://www.w3.org/2000/svg', element);
    } else {
        var elementObject = document.createElement(element);
    }
    if (attr) {
        for (var key in attr) {
            elementObject.setAttribute(key, attr[key]);
        }
    }
    if (chilled) {
        if (chilled instanceof Array) {
            for (var chilleds in chilled) {
                elementObject.appendChild(chilled[chilleds]);
            }
        } else if (typeof chilled == 'string') {
            elementObject.innerHTML = chilled;
        } else {
            elementObject.appendChild(chilled);
        }

    }
    return elementObject;
}

export {
    generateElement,
    findValue
}