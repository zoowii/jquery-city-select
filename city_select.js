(function ($) {
    function getProvincies() {
        var prov_array = [];
        for (var i = 0; i < provinceAndCityData.province.length; i++) {
            var tmp = provinceAndCityData.province[i];
            prov_array[i] = {
                id:tmp.id,
                code:tmp.code,
                name:tmp.name
            };
        }
        return prov_array;
    }

    function getCities(provinceCode) {
        for (var i = 0; i < provinceAndCityData.province.length; i++) {
            var tmp = provinceAndCityData.province[i];
            if (tmp.code == provinceCode) {
                var cities_tmp = tmp.city;
                var city_array = [];
                for (var j = 0; j < cities_tmp.length; j++) {
                    var city_tmp = cities_tmp[j];
                    city_array[j] = {
                        id:city_tmp.id,
                        code:city_tmp.code,
                        name:city_tmp.name
                    };
                }
                return city_array;
            }
        }
        return [];
    }

    function getAreas(cityCode) {
        for (var i = 0; i < provinceAndCityData.province.length; i++) {
            var province = provinceAndCityData.province[i];
            for (var j = 0; j < province.city.length; j++) {
                var city = province.city[j];
                if (city.code == cityCode) { // found the city
                    var areas = city.area;
                    var area_array = [];
                    for (var k = 0; k < areas.length; k++) {
                        var area = areas[k];
                        area_array[k] = {
                            id:area.id,
                            code:area.code,
                            name:area.name
                        };
                    }
                    return area_array;
                }
            }
        }
    }

    var city_select = {
        getProvincies:getProvincies,
        getCities:getCities,
        getAreas:getAreas,
        select:function (jqueryElement, input_element, default_city_code) {
            input_element = input_element || null;
            default_city_code = default_city_code || null;
            var el = jqueryElement;
            el.html('');
            var outer1 = $("<select class='city_select'></select>");
            var provincies = getProvincies();
            for (var i = 0; i < provincies.length; i++) {
                var province = provincies[i];
                outer1.append($("<option value='" + province.code + "'>" + province.name + "</option>"));
            }
            var outer2 = $("<select class='city_select'></select>");
            var outer3 = $("<select class='city_select'></select>");
            el.append(outer1);
            el.append(outer2);
            el.append(outer3);
            outer1.change(function () {
                var provinceCode = $(this).val();
                el.attr('code', provinceCode);
                if (input_element != null) {
                    input_element.val(provinceCode);
                }
                var cities = getCities(provinceCode);
                outer2.html('');
                outer3.html('');
                for (var i = 0; i < cities.length; i++) {
                    var city = cities[i];
                    outer2.append($("<option value='" + city.code + "'>" + city.name + "</option>"));
                }
                outer2.change(function () {
                    var cityCode = $(this).val();
                    el.attr('code', cityCode);
                    if (input_element != null) {
                        input_element.val(provinceCode);
                    }
                    var areas = getAreas(cityCode);
                    outer3.html('');
                    for (var i = 0; i < areas.length; i++) {
                        var area = areas[i];
                        outer3.append($("<option value='" + area.code + "'>" + area.name + "</option>"));
                    }
                    outer3.change(function () {
                        var areaCode = $(this).val();
                        el.attr('code', areaCode);
                        if (input_element != null) {
                            input_element.val(provinceCode);
                        }
                    });
                    outer3.trigger('change');
                });
                outer2.trigger('change');
                outer3.trigger('change');
            });
            outer1.trigger('change');
            outer2.trigger('change');
            outer3.trigger('change');

            if (default_city_code != null) {
                if (default_city_code.length == 6) {
                    var province_code = default_city_code.substring(0, 2) + '0000';
                    var city_code = default_city_code.substring(0, 4) + '00';
                    var district_code = default_city_code;
                    outer1.val(province_code);
                    outer1.trigger('change');
                    outer2.val(city_code);
                    outer2.trigger('change');
                    outer3.val(district_code);
                    outer3.trigger('change');
                }
            }
        }
    };

    $.extend({
        city_select:city_select.select
    });
})(jQuery);