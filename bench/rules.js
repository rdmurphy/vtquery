'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

module.exports = [

  // real-world point in polygon "within/intersects"
  {
    description: 'pip: many building polygons',
    queryPoint: [120.9667, 14.6028],
    options: { radius: 0 },
    tiles: [
      { z: 16, x: 54789, y: 30080, buffer: fs.readFileSync('./test/fixtures/manila-buildings-16-54789-30080.mvt')}
    ]
  },
  {
    description: 'pip: many building polygons, single layer',
    queryPoint: [120.9667, 14.6028],
    options: { radius: 0, layers: ['building'] },
    tiles: [
      { z: 16, x: 54789, y: 30080, buffer: fs.readFileSync('./test/fixtures/manila-buildings-16-54789-30080.mvt')}
    ]
  },

  // real-world queries "closest point"
  {
    description: 'query: many building polygons, single layer',
    queryPoint: [120.9667, 14.6028],
    options: { radius: 600, geometry: 'polygon', layers: ['building'] },
    tiles: [
      { z: 16, x: 54789, y: 30080, buffer: fs.readFileSync('./test/fixtures/manila-buildings-16-54789-30080.mvt')}
    ]
  },
  {
    description: 'query: linestrings, mapbox streets roads',
    queryPoint: [120.991, 14.6147],
    options: { radius: 3000, geometry: 'linestring' },
    tiles: [
      { z: 14, x: 13698, y: 7519, buffer: fs.readFileSync('./test/fixtures/manila-roads-terrain-14-13698-7519.mvt')}
    ]
  },
  {
    description: 'query: polygons, mapbox streets buildings',
    queryPoint: [120.9667, 14.6028],
    options: { radius: 600, geometry: 'polygon' },
    tiles: [
      { z: 16, x: 54789, y: 30080, buffer: fs.readFileSync('./test/fixtures/manila-buildings-16-54789-30080.mvt')}
    ]
  },
  {
    description: 'query: all things - dense single tile',
    queryPoint: [-122.437, 37.7666],
    options: { radius: 1000 },
    tiles: [
      { z: 15, x: 5239, y: 12666, buffer: getTile('sanfrancisco', '15-5239-12666.mvt')}
    ]
  },
  {
    description: 'query: all things - dense nine tiles',
    queryPoint: [-122.4483, 37.7668],
    options: { radius: 1500 },
    tiles: [
      { z: 15, x: 5237, y: 12665, buffer: getTile('sanfrancisco', '15-5237-12665.mvt')},
      { z: 15, x: 5237, y: 12666, buffer: getTile('sanfrancisco', '15-5237-12666.mvt')},
      { z: 15, x: 5237, y: 12667, buffer: getTile('sanfrancisco', '15-5237-12667.mvt')},
      { z: 15, x: 5238, y: 12665, buffer: getTile('sanfrancisco', '15-5238-12665.mvt')},
      { z: 15, x: 5238, y: 12666, buffer: getTile('sanfrancisco', '15-5238-12666.mvt')},
      { z: 15, x: 5238, y: 12667, buffer: getTile('sanfrancisco', '15-5238-12667.mvt')},
      { z: 15, x: 5239, y: 12665, buffer: getTile('sanfrancisco', '15-5239-12665.mvt')},
      { z: 15, x: 5239, y: 12666, buffer: getTile('sanfrancisco', '15-5239-12666.mvt')},
      { z: 15, x: 5239, y: 12667, buffer: getTile('sanfrancisco', '15-5239-12667.mvt')}
    ]
  },

  {
    description: 'query: all things - dense nine tiles (compressed)',
    queryPoint: [-122.4483, 37.7668],
    options: { radius: 1500 },
    tiles: [
      { z: 15, x: 5237, y: 12665, buffer: getTile('sanfrancisco', '15-5237-12665.mvt', true)},
      { z: 15, x: 5237, y: 12666, buffer: getTile('sanfrancisco', '15-5237-12666.mvt', true)},
      { z: 15, x: 5237, y: 12667, buffer: getTile('sanfrancisco', '15-5237-12667.mvt', true)},
      { z: 15, x: 5238, y: 12665, buffer: getTile('sanfrancisco', '15-5238-12665.mvt', true)},
      { z: 15, x: 5238, y: 12666, buffer: getTile('sanfrancisco', '15-5238-12666.mvt', true)},
      { z: 15, x: 5238, y: 12667, buffer: getTile('sanfrancisco', '15-5238-12667.mvt', true)},
      { z: 15, x: 5239, y: 12665, buffer: getTile('sanfrancisco', '15-5239-12665.mvt', true)},
      { z: 15, x: 5239, y: 12666, buffer: getTile('sanfrancisco', '15-5239-12666.mvt', true)},
      { z: 15, x: 5239, y: 12667, buffer: getTile('sanfrancisco', '15-5239-12667.mvt', true)}
    ]
  },

  // real-world elevation
  {
    description: 'elevation: terrain tile nepal',
    queryPoint: [85.2765, 28.0537],
    options: {},
    tiles: [
      { z: 13, x: 6036, y: 3430, buffer: getTile('nepal', '13-6036-3430.mvt')}
    ]
  },

  // geometry
  {
    description: 'geometry: 2000 points in a single tile, no properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'point' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/points-16-10498-22872.mvt')}
    ]
  },
  {
    description: 'geometry: 2000 points in a single tile, with properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'point' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/points-properties-16-10498-22872.mvt')}
    ]
  },
  {
    description: 'geometry: 2000 linestrings in a single tile, no properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'linestring' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/linestrings-16-10498-22872.mvt')}
    ]
  },
  {
    description: 'geometry: 2000 linestrings in a single tile, with properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'linestring' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/linestrings-properties-16-10498-22872.mvt')}
    ]
  },
  {
    description: 'geometry: 2000 polygons in a single tile, no properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'polygon' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/polygons-16-10498-22872.mvt')}
    ]
  },
  {
    description: 'geometry: 2000 polygons in a single tile, with properties',
    queryPoint: [-122.3302, 47.6639],
    options: { radius: 500, geometry: 'polygon' },
    tiles: [
      { z: 16, x: 10498, y: 22872, buffer: fs.readFileSync('./test/fixtures/polygons-properties-16-10498-22872.mvt')}
    ]
  }
];

function getTile(name, file, compress) {
  compress = compress || false;
  var buf = fs.readFileSync(path.join(__dirname, '..', 'node_modules', '@mapbox', 'mvt-fixtures', 'real-world', name, file))
  if (compress) {
    return zlib.gzipSync(buf);
  } else {
    return buf;
  }
}
