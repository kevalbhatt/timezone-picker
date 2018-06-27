/**
 * @version: v2.0.0-0
 * @author: Keval Bhatt 
 * @copyright: Copyright (c) 2015 Keval Bhatt. All rights reserved.
 * @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
 * @website: http://kevalbhatt.github.io/timezone-picker/
 */

/**
 * [plugin register jquery plugin]
 * @param  {[string]}  options.name [Plugin name]
 * @param  {[object]}  options.classRef [Class object]
 * @param  {Boolean} options.shortHand  [Generate a shorthand as $.pluginName]
 * @return {[type]}                     [description]
 */

export default function plugin({ pluginName, classRef, shortHand = false }) {
    let dataName = `${pluginName}`;
    let old = $.fn[pluginName];

    $.fn[pluginName] = function(option) {
        return this.each(function() {
            let $this = $(this);
            let data = $this.data(dataName);
            let options = $.extend({}, classRef.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) {
                $this.data(dataName, (data = new classRef($this, options)));
            }

            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    // - Short hand
    if (shortHand) {
        $[pluginName] = (options) => $({})[pluginName](options);
    }

    // - No conflict
    $.fn[pluginName].noConflict = () => $.fn[pluginName] = old;
}