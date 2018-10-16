/****************************************************************************
	geojson-utilities.js.js,

	(c) 2018, FCOO

	https://github.com/FCOO/geojson-utilities.js
	https://github.com/FCOO

****************************************************************************/
(function ($, window/*, document, undefined*/) {
    "use strict";

    //Create namespace
    window.GeoJSON = window.GeoJSON || {};
	var ns = window.GeoJSON;


    /**********************************************************
    normalize
    Normalize a GeoJSON feature into a FeatureCollection.
    * @param {object} gj geojson data
    * @returns {object} normalized geojson data
    https://github.com/mapbox/geojson-normalize
    **********************************************************/
    var types = {
            Point: 'geometry',
            MultiPoint: 'geometry',
            LineString: 'geometry',
            MultiLineString: 'geometry',
            Polygon: 'geometry',
            MultiPolygon: 'geometry',
            GeometryCollection: 'geometry',
            Feature: 'feature',
            FeatureCollection: 'featurecollection'
        };

    ns.normalize = function(gj) {
        if (!gj || !gj.type) return null;
        var type = types[gj.type];
        if (!type) return null;

        if (type === 'geometry') {
            return {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: gj
                }]
            };
        } else
            if (type === 'feature') {
                return {
                    type: 'FeatureCollection',
                    features: [gj]
                };
            }
            else
                if (type === 'featurecollection') {
                    return gj;
                }
    };


    /**********************************************************
    flatten
    Flatten MultiPoint, MultiPolygon, MultiLineString, and
    GeometryCollection geometries in GeoJSON files into
    simple non-complex geometries.
    https://github.com/node-geojson/geojson-flatten
    **********************************************************/
    var flatten = ns.flatten = function(gj){
        switch ((gj && gj.type) || null) {
            case 'FeatureCollection':
                gj.features = gj.features.reduce(function(mem, feature) {
                    return mem.concat(flatten(feature));
                }, []);
                return gj;
            case 'Feature':
                if (!gj.geometry) return gj;
                return flatten(gj.geometry).map(function(geom) {
                    var data = {
                           type: 'Feature',
                            properties: JSON.parse(JSON.stringify(gj.properties)),
                            geometry: geom
                        };
                    if (gj.id !== undefined) {
                        data.id = gj.id;
                    }
                    return data;
                });

            case 'MultiPoint':
                return gj.coordinates.map(function(_) {
                    return { type: 'Point', coordinates: _ };
                });

            case 'MultiPolygon':
                return gj.coordinates.map(function(_) {
                    return { type: 'Polygon', coordinates: _ };
                });

            case 'MultiLineString':
                return gj.coordinates.map(function(_) {
                    return { type: 'LineString', coordinates: _ };
                });

            case 'GeometryCollection':
                return gj.geometries.map(flatten).reduce(function(memo, geoms) {
                    return memo.concat(geoms);
                }, []);

            case 'Point':
            case 'Polygon':
            case 'LineString':
                return [gj];
        }
    };


    /**********************************************************
    merge
    Merge a series of GeoJSON objects into one FeatureCollection containing all
    features in all files.  The objects can be any valid GeoJSON root object,
    including FeatureCollection, Feature, and Geometry types.

    * @param {Array<Object>} inputs a list of GeoJSON objects of any type
    * @return {Object} a geojson FeatureCollection.

    https://github.com/mapbox/geojson-merge
    **********************************************************/
    ns.merge = function(inputs){
        var output = {
                type: 'FeatureCollection',
                features: []
            };
        for (var i = 0; i < inputs.length; i++) {
            var normalized = ns.normalize(inputs[i]);
            for (var j = 0; j < normalized.features.length; j++) {
                output.features.push(normalized.features[j]);
            }
        }
        return output;
    };



}(jQuery, this, document));
