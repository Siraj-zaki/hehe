

export const clusterLayer = {

  id: 'clusters',
  type: 'circle',
  source: 'point',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

export const clusterCountLayer = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'point',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer = {
  id: "point",
  type: "symbol",
  source: "point",
  layout: {
    "icon-image": 'water',
    "icon-size": 1.5,
  },
  filter: ['!', ['has', 'point_count']],
};
export const unclusteredPointLayerZoo = {
  id: "point",
  type: "symbol",
  source: "point",
  layout: {
    "icon-image": 'zoo',
    "icon-size": 1.5,
    "icon-allow-overlap": false,
    // 'icon-allow-overlap': true,
    'icon-ignore-placement': true,
    // 'text-allow-overlap': true,
  },
  filter: ['!', ['has', 'point_count']],
};
export const unclusteredPointLayerPinCustom = {
  id: "point",
  type: "symbol",
  source: "point",
  // layout: {
  //   "icon-image": 'pin-maker-custom',
  //   "icon-size": 1.5,
  //   "icon-allow-overlap": true,
  //   'icon-ignore-placement': true,
  //   'icon-color':'#101BC6'
  // },
  layout: {
    'text-line-height': 1, // this is to avoid any padding around the "icon"
    'text-padding': 0,
    'text-anchor': 'bottom', // change if needed, "bottom" is good for marker style icons like in my screenshot,
    'text-allow-overlap': true, // assuming you want this, you probably do
    'text-field': 'a', // IMPORTANT SEE BELOW: -- this should be the unicode character you're trying to render as a string -- NOT the character code but the actual character,
    'icon-optional': true, // since we're not using an icon, only text.
    'text-font': ['untitled-font-27 font-27'], // see step 1 -- whatever the icon font name,
    'text-size': 25 // or whatever you want -- dont know if this can be data driven...
  },
  paint: {
    'text-translate-anchor': 'viewport', // up to you to change this -- see the docs
    'text-color': '#AED6F1'  // whatever you want -- can even be data driven using a `{featureProperty}`,
  },
  filter: ['!', ['has', 'point_count']],
};
export const demoLayer = {
  id: 'point',
  type: 'circle',
  source: 'point',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#6a5acd',
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#bab0f7',
    "circle-opacity-transition": { duration: 1000 },
  }
};
export const demoLayerPink = {
  id: 'pointNew',
  type: 'circle',
  source: 'point',
  filter: ['==', ['get', 'Status'], 'lat_lon_changed'],
  paint: {
    'circle-color': '#FF0000',
    'circle-radius': 4,
    'circle-stroke-width': 2,
    'circle-stroke-color': '#bab0f7',
    "circle-opacity-transition": { duration: 1000 },
  }
};
export const unclusteredPointLayerArtGallery = {
  id: "point",
  type: "symbol",
  source: "point",
  layout: {
    "icon-image": 'art-gallery',
    "icon-size": 1,
    "icon-allow-overlap": true,
    'icon-ignore-placement': true,
  },
  filter: ['!', ['has', 'point_count']],
};
export const unclusteredPointLayerClothingStore = {
  id: "point",
  type: "symbol",
  source: "point",
  layout: {
    "icon-image": 'clothing-store',
    "icon-size": 1.5,
    "icon-allow-overlap": false,
    'icon-ignore-placement': true,
  },
  filter: ['!', ['has', 'point_count']],
};
export const unclusteredPointLayerClothingWater = {
  id: "point",
  type: "symbol",
  source: "point",
  layout: {
    "icon-image": 'water',
    "icon-size": 1.5,
    "icon-allow-overlap": true,
    'icon-ignore-placement': true,
  },
  filter: ['!', ['has', 'point_count']],
};