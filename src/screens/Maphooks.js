import React, { useState, useRef } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { pinsData } from "./pins";


export default function Maphooks() {
    const [viewport, setViewport] = useState({
        latitude: 52.6376,
        longitude: -1.135171,
        zoom: 10,
        width: '100%',
        height: 550
    });
    const mapRef = useRef();

    // const crimes = pinsData.features ? pinsData.features.slice(0, 2000) : [];
    const points = pinsData.features.map(crime => ({
        type: "Feature",
        properties: { cluster: false, crimeId: crime.geometry.coordinates[0], category: crime.geometry.coordinates[0] },
        geometry: {
            type: "Point",
            coordinates: [
                crime.geometry.coordinates[0],
                crime.geometry.coordinates[1]
            ]
        }
    }));

    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null;

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 75, maxZoom: 20 }
    });

    return (
        <div>
            <ReactMapGL
                {...viewport}
                maxZoom={20}
                mapboxAccessToken='pk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2wxd250eThmMDJncTNjc2oyZ2RncTRvdSJ9.1TOmktpX9nX9MH07aym5fQ'
                onViewportChange={newViewport => {
                    setViewport({ ...newViewport });
                }}
                ref={mapRef}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                key={`cluster-${cluster.id}`}
                                latitude={latitude}
                                longitude={longitude}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 20}px`,
                                        height: `${10 + (pointCount / points.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );

                                        setViewport({
                                            ...viewport,
                                            latitude,
                                            longitude,
                                            zoom: expansionZoom,
                                            // transitionInterpolator: new FlyToInterpolator({
                                            //     speed: 2
                                            // }),
                                            transitionDuration: "auto"
                                        });
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={`crime-${cluster.properties.crimeId}`}
                            latitude={latitude}
                            longitude={longitude}
                        >
                            <button className="crime-marker">
                                asd
                            </button>
                        </Marker>
                    );
                })}
            </ReactMapGL>
        </div>
    );
}
