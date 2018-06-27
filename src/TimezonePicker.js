/**
 * @version: v2.0.0-0
 * @author: Keval Bhatt 
 * @copyright: Copyright (c) 2015 Keval Bhatt. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://kevalbhatt.github.io/timezone-picker/
 */
'use strict';

import timezones from 'timezones.json';
import { findValue, generateElement } from 'utils/Utils';
import Plugin from 'utils/Plugin';
import 'select2';
import 'select2/dist/css/select2.css';

import 'styles/style';

export default class TimezonePicker {
    static VERSION: "v2.0.0-0"

    static DEFAULTS = {
        width: 500,
        height: 250,
        defaultValue: null,
        mapHoverType: null,
        quickLinkClass: "",
        quickLink: [{
            "IST": "IST",
            "LONDON": "Europe/London"
        }],
        selectBox: true,
        selectClass: "",
        filterBoxClass: "",
        showHoverText: true,
        hoverTextClass: "",
        hoverTextEl: null,
        hoverText: null,
        dayLightSaving: ((typeof moment == "function") ? (true) : (false))
    }

    constructor(element, options) {
        this.$el = element;
        this.generateMap(options);
        if (options.defaultValue) {
            if (typeof options.defaultValue == "object") {
                let { value, attribute } = options.defaultValue;
                this.setValue(value, attribute);
            } else {
                this.setValue(options.defaultValue);
            }
        } else {
            let timezoneObj = this.getSystemTimezone()[0];
            if (timezoneObj) {
                this.setValue(timezoneObj.timezone);
            }
        }
    }
    /**
     * [getTimeZoneObject returns timezone object based on value and attribute, default attribute is timezone]
     * @param  {[String]} value [description]
     * @param  {[String]} attribute [description]
     * @return {[Array<Object>]}         [description]
     */
    getTimeZoneObject(value, attribute) {
        return findValue(attribute ? attribute : 'timezone', value, this.timezone)
    }
    /**
     * [getSystemTimezone return system timezone object]
     * @return {[Object]} [description]
     */
    getSystemTimezone() {
        var timezone = moment.tz.guess();
        return this.getTimeZoneObject(timezone)
    }
    /**
     * [getZoneName return zonename based on value and attribute, default attribute is timezone]
     * @param  {[String]} value [description]
     * @param  {[String]} attribute [description]
     * @return {[String]}         [description]
     */
    getZoneName(value, attribute) {
        return this.getTimeZoneObject(value, attribute).zonename
    }
    /**
     * [getTimeZoneString return timezone based on value and attribute, default attribute is timezone]
     * @param  {[String]} value [description]
     * @param  {[String]} attribute [description]
     * @return {[String]}
     */
    getTimeZoneString(value, attribute) {
        return this.getTimeZoneObject(value, attribute ? attribute : "country").timezone
    }
    /**
     * [setValue set value in map]
     * @param {[type]} value        [attribute value]
     * @param {[type]} attribute        [attribute name]
     */
    setValue(value, attribute) {
        this.$el.find('svg polygon').attr('data-selected', 'false');
        let elements = this.$el.find('svg polygon[data-' + (attribute ? attribute : "timezone") + '="' + value + '"]');
        if (elements && elements.length) {
            elements.attr('data-selected', 'true');
            this.$el.find("select.country-lov").val(elements.data('timezone')).trigger('change', { manually: true });
            this.$el.find('.quick-link span').removeClass('active');
            this.$el.find('.quick-link').children('[data-select="' + elements.data('zonename') + '"],[data-select="' + elements.data('timezone') + '"],[data-select="' + elements.data('country') + '"]').addClass('active');
        }
        this.$el.trigger("map:value:changed");
    }
    /**
     * [getValue get selected value array]
     * @return {[Array<Object>]} [description]
     */
    getValue() {
        var value = [];
        this.$el.find('svg polygon[data-selected="true"]').map(function(index, el) {
            value.push($(el).data());
        });
        return value;
    }
    /**
     * [generateMap create element dynamically]
     * @param  {[Object]} options [depanding on option it will create elements]
     * @return {[Null]}         [description]
     */
    generateMap(options) {

        var polygon = [],
            option = [],
            quickLink = [],
            containerArr = [];
        this.timezone = Object.assign([], timezones);
        var timezone = this.timezone;
        for (var index in timezone) {

            let zoneObj = timezone[index];
            if (moment) {
                /**
                 * [replace zonename and timezone value with moment value
                 */
                var momentObj = moment().tz(zoneObj.timezone);
                zoneObj.zonename = momentObj.zoneName();
                zoneObj.timezone = momentObj._z.name
            }
            polygon.push(generateElement({
                element: 'polygon',
                attr: {
                    'data-timezone': timezone[index].timezone,
                    'data-country': timezone[index].country,
                    'data-pin': timezone[index].pin,
                    'data-offset': timezone[index].offset,
                    'points': timezone[index].points,
                    'data-zonename': timezone[index].zonename
                },
                isSvg: true
            }));

            option.push(generateElement({
                element: 'option',
                attr: {
                    'value': timezone[index].timezone
                },
                chilled: timezone[index].timezone + " (" + timezone[index].zonename + ")"
            }));
        }
        if (options.selectBox) {
            var select = generateElement({
                element: 'select',
                attr: {
                    'class': (options.selectClass + ' country-lov').trim(),
                },
                chilled: option
            });
            containerArr.push(select);
        }


        if (options.quickLink.length > 0) {
            for (var index in options.quickLink[0]) {
                quickLink.push(generateElement({
                    element: 'span',
                    attr: {
                        'data-select': options.quickLink[0][index]
                    },
                    chilled: index
                }));
            }
            var qickLinkDiv = generateElement({
                element: 'div',
                attr: {
                    'class': (options.quickLinkClass + ' quick-link').trim()
                },
                chilled: quickLink
            });
            containerArr.push(qickLinkDiv);
        }

        if (options.showHoverText) {
            var content = generateElement({
                element: 'p'
            });
            var hoverZone = generateElement({
                element: 'div',
                attr: {
                    'class': (options.hoverTextClass + ' hover-text').trim(),
                },
                chilled: content
            });
            if (options.hoverTextEl) {
                options.hoverTextEl.append(hoverZone);
            } else {
                containerArr.push(hoverZone);
            }
        }

        var svg = generateElement({
            element: 'svg',
            attr: {
                'class': 'timezone-map',
                'viewBox': '0 0 ' + options.width + ' ' + options.height
            },
            chilled: polygon,
            isSvg: true
        });

        if (containerArr.length > 0) {
            var container = generateElement({
                element: 'div',
                attr: {
                    'class': (options.filterBoxClass + ' filter-box').trim()
                },
                chilled: containerArr
            });
            this.$el.append(container);
            if ($.fn.select2) {
                $('.country-lov').select2();
            }
        }

        this.$el.append(svg);

        this.bindEvent(options);

    }
    /**
     * [bindEvent bind all event i.e click,mouseenter,mouseleave,change(select)]
     * @return {[type]} [description]
     */
    bindEvent(options) {
        this.$el.on('mouseenter', 'svg polygon', (e) => {
            var el = null,
                data = $(e.target).data(),
                hoverKey = options.mapHoverType,
                hoverText = options.hoverText;
            if (hoverKey) {
                el = $('.timezone-map polygon[data-' + hoverKey + '="' + data[hoverKey] + '"]');
            } else {
                el = $(e.currentTarget);
            }
            this.$el.find('.hover-text p').addClass('active').text(hoverText && hoverText instanceof Function ? hoverText(e, data) : (data.timezone + " (" + data.zonename + ")"));
        });
        this.$el.on('mouseleave', 'svg polygon', (e) => {
            this.$el.find('.hover-text p').removeClass('active').text('');
        });
        this.$el.on('click', 'svg polygon', (e) => {
            this.setValue($(e.target).data('timezone'));
            this.$el.trigger("map:country:clicked");
        });
        this.$el.on('change', 'select', (e, options) => {
            if (!options || !options.manually) {
                this.setValue($(e.target).val());
                this.$el.trigger("map:option:changed");
            }
        });
        this.$el.on('click', '.quick-link span', (e) => {
            var selectValue = $(e.target).data('select');
            if (selectValue.search('/') > 0) {
                this.setValue(selectValue, 'timezone');
            } else {
                this.setValue(selectValue, 'zonename');
            }
            this.$el.trigger("map:quickLink:clicked");
        });
    }
}

Plugin({ pluginName: "timezonePicker", classRef: TimezonePicker });