(function(root) {
    "use strict";

    var PointInPolygon = function(polygon, point) {
        var nvert = polygon.length;
        var c = false;
        var i = 0;
        var j = 0;
        for (i = 0, j = nvert - 1; i < nvert; j = i++) {
            if (((polygon[i][1] > point[1]) != (polygon[j][1] > point[1])) &&
                (point[0] < (polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
                c = !c;
            }
        }
        return c;
    };

    var getProvince = function(geojson, lat, lng) {
        if (typeof lat !== 'number' || typeof lng !== 'number') {
            return new Error('Wrong coordinates (' + lat + ',' + lng + ')');
        }

        var point = [lng, lat];
        var i = 0;
        var found = false;
        do {
            var state = geojson[i];
            if (state.geometry.type === 'Polygon') {
                found = PointInPolygon(state.geometry.coordinates[0], point);
            } else if (state.geometry.type === 'MultiPolygon') {
                var j = 0;
                do {
                    found = PointInPolygon(state.geometry.coordinates[j][0], point);
                    j++;
                } while (j < state.geometry.coordinates.length && !found);
            }
            i++;
        } while (i < geojson.length && !found);

        if (found) {
            return geojson[i - 1].properties;
        } else {
            return null;
        }
    };

    if(typeof module != 'undefined'){
    	module.exports = getProvince;
    }
    else {
    	root.getProvince = getProvince;
    }
})(this);
