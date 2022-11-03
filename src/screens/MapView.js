import MapboxDraw from '@mapbox/mapbox-gl-draw';
import AdjustIcon from '@mui/icons-material/Adjust';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slider from '@mui/material/Slider';
import DialogTitle from '@mui/material/DialogTitle';
import { booleanPointInPolygon, point, pointsWithinPolygon, polygon as ShowPolygon } from '@turf/turf';
import React, { useCallback, useEffect } from 'react';
import ReactMapGL, {
    FullscreenControl, Layer, NavigationControl, ScaleControl, Source
} from 'react-map-gl';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { clusterCountLayer, clusterLayer, demoLayer, demoLayerPink } from './layers';
import { Button as MaterialButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { DatePicker, Typography } from 'antd';
import { AiFillFilter } from 'react-icons/ai';
import { BiDetail, BiRename } from 'react-icons/bi';
import { BsBoundingBoxCircles, BsFillMapFill } from 'react-icons/bs';
import { Gi3DStairs, GiMushroomsCluster } from 'react-icons/gi';
import { IoMdRefreshCircle } from 'react-icons/io';
import { RiContrastDropFill } from 'react-icons/ri';
import { SketchPicker } from 'react-color';
import { useControl } from 'react-map-gl';
// import SQCCImage from '../assets/leedsG.gif'
import { Autocomplete, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import MapDrawer from '../components/MapDrawer';
import { BoxData } from './boxGrid';
import moment from 'moment'

import { ClipLoader } from 'react-spinners';
const { RangePicker } = DatePicker;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
function MapView(props) {
    const mapRef = React.useRef(null)
    const [features, setFeatures] = React.useState([]);
    const [createdFeatures, setCreatedFeatures] = React.useState(null);
    const [polygon, setPolygon] = React.useState(false);
    const [mapLoader, setMapLoader] = React.useState(false);
    const [pinMarker, setpinMarker] = React.useState('')
    const [zoneOpacity, setZoneOpacity] = React.useState(0.5)
    const [siteOpacity, setSiteOpacity] = React.useState(0.5)
    const [displayColorsID, setDisplayColorsID] = React.useState(0)
    const [circleOpacity, setCircleOpacity] = React.useState(0)
    const [zoneSliderToggler, setZoneSliderToggler] = React.useState(false)
    const [filterToggler, setFilterToggler] = React.useState(false)
    const [siteSliderToggler, setSiteSliderToggler] = React.useState(false)
    const [zoneLabel, setZoneLabel] = React.useState(true)
    const [pinInfo, setPinInfo] = React.useState({})
    const [refresh, setRefresh] = React.useState(false)
    const [sidebarToggler, setSidebarToggler] = React.useState(false)
    const [byCluster, setByCluster] = React.useState(false)
    const [showClusters, setShowClusters] = React.useState(false)
    const [showLevels, setShowLevels] = React.useState(false)
    const [assetId, setassetId] = React.useState('')
    const [clusterDataFiltered, setClusterDataFiltered] = React.useState([])
    const [clusterEpcVal, setClusterEpcVal] = React.useState("")
    const [serialNumer, setserialNumer] = React.useState('')
    const [itemCategory, setitemCategory] = React.useState('')
    const [level, setlevel] = React.useState('')
    const [roomNo, setroomNo] = React.useState('')
    const [attribute, setAttribute] = React.useState({ title: 'Category', value: 'Category' })
    const [ruleOperator, setRuleOperator] = React.useState({ title: 'is Equal to', value: '===' })
    const [property, setProperty] = React.useState({ title: '', value: '' })
    const [propertyOptions, setPropertyOptions] = React.useState([])
    const [description, setdescription] = React.useState('')
    const [oddo_tag, setoddo_tag] = React.useState('')
    const [showIcon, setShowIcon] = React.useState(false)
    const [showDisplayColors, setShowDisplayColors] = React.useState(false)
    const [epc, setepc] = React.useState('')
    const [colorPicker, setColorPicker] = React.useState('#f8e71c')
    const [iconVal, setIconVal] = React.useState({ title: "Marker", value: 'a', icon: <i style={{ "--color": colorPicker }} class="icon-map-marker" /> })
    const [lastCycleDate, setlastCycleDate] = React.useState('')
    const [displayColors, setDisplayColors] = React.useState([])
    const [pointers, setPointers] = React.useState([])
    const [clusterData, setClusterData] = React.useState([])
    const [LastDetectDate, setLastDetectDate] = React.useState('')
    const [assetData, setAssetData] = React.useState({ type: 'FeatureCollection', features: [] })
    const [assetDataCopy, setAssetDataCopy] = React.useState({ type: 'FeatureCollection', features: [] })
    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);
    // useEffect(async () => {
    //     let newArray = []
    //     for (let index = 0; index < BoxData.features.length; index++) {
    //         const BOXName = BoxData.features[index];
    //         const BOX = BOXName.geometry.coordinates;
    //         var searchWithin = ShowPolygon(
    //             BOX
    //         );
    //         for (let index = 0; index < pinsData.features.length; index++) {
    //             const PointsProperties = pinsData.features[index];
    //             const Points = PointsProperties.geometry.coordinates;
    //             var points = point(
    //                 Points
    //             );
    //             var ptsWithin = pointsWithinPolygon(points, searchWithin);
    //             if (ptsWithin.features.length !== 0) {
    //                 console.log(ptsWithin, BOXName.properties.name, 'asd');
    //             }
    //             await newArray.push({
    //                 type: 'FeatureCollection', features: ptsWithin.features.map(obj => ({ ...obj, properties: { pre: PointsProperties.properties, boxName: BOXName.properties.name } }))
    //             })

    //         }
    //     }
    //     setPointers(newArray.filter((item => item.features.length !== 0)))
    // }, []);
    useEffect(() => {
        setRefresh(!refresh)
        console.log(pointers, 'pointers');
    }, [pointers]);
    const dateFilter = () => {
        if (description !== '') {
            let boxDataNew = BoxData.features.filter((item => item.properties.name.includes(description)))
            console.log(boxDataNew, 'asdfasdf');
            let newArray = []
            const BOXName = boxDataNew[0]?.properties?.name;
            const BOX = boxDataNew[0].geometry?.coordinates;
            var searchWithin = ShowPolygon(
                BOX
            );


            for (let index = 0; index < props.plantMC.features.length; index++) {
                const PointsProperties = props.plantMC.features[index];
                const Points = PointsProperties?.geometry.coordinates;
                var points = point(
                    Points
                );
                var ptsBoolean = booleanPointInPolygon(points, searchWithin)
                if (ptsBoolean) {
                    newArray.push({
                        "type": "FeatureCollection",
                        "features": [PointsProperties]
                    })
                }
            }
            // console.log(newArray.filter((item => item.features.length !== 0)), 'newArray')
            const filterData = newArray.filter((item => item.features.length !== 0))
            console.log(filterData.map(obj => ({ ...obj.features })).map((item => item[0])));
            return filterData.map(obj => ({ ...obj.features })).map((item => item[0]))
        } else {
            return assetDataCopy.features.filter(
                (x) =>
                    (LastDetectDate === "" || LastDetectDate === null) ?
                        x?.properties?.HandlingUnit?.includes(assetId)
                        &&
                        x?.properties?.Material_Code?.includes(serialNumer)
                        &&
                        x?.properties?.Batch?.includes(itemCategory)
                        &&
                        x?.properties?.Grade?.includes(level)
                        &&
                        x?.properties?.Qty?.includes(roomNo)
                        :
                        x?.properties?.HandlingUnit?.includes(assetId)
                        &&
                        x?.properties?.Material_Code?.includes(serialNumer)
                        &&
                        x?.properties?.Batch?.includes(itemCategory)
                        &&
                        x?.properties?.Grade?.includes(level)
                        &&
                        x?.properties?.Qty?.includes(roomNo)
                // &&
                // (new Date(x?.properties?.ProductionDate).toLocaleString("en-Us", "Asia/Muscat")
                //     >=
                //     new Date(LastDetectDate[0]).toLocaleString("en-Us", "Asia/Muscat")
                //     &&
                //     new Date(x?.properties?.ProductionDate).toLocaleString("en-Us", "Asia/Muscat")
                //     <=
                //     new Date(LastDetectDate[1]).toLocaleString("en-Us", "Asia/Muscat")
                // )


            );
        }

    };
    const dateFilterCluster = () => {
        return clusterDataFiltered.filter(
            (x) =>
                x?.properties?.HandlingUnit.includes(clusterEpcVal)
        );
    };
    useEffect(() => {
        setAssetData(props.plantMC)
        setAssetDataCopy(props.plantMC)
        // console.log(props.asset, 'props.asset');
    }, [props.plantMC])
    useEffect(() => {
        const filtersAll = JSON.parse(localStorage.getItem("FILTERS"))
        setPropertyOptions(filtersAll?.Item_Category.map((item => {
            return { title: item, value: item }
        })))

    }, [localStorage.getItem("FILTERS")]);
    const handleChangeComplete = (color, event, index) => {
        // console.log(color);
        setColorPicker(color.hex)

    };


    const filterData = async () => {
        await setMapLoader(true)
        await setAssetData({ type: 'FeatureCollection', features: dateFilter() });
        await setMapLoader(false)
    }
    const filterDataCluster = () => {
        setClusterData(dateFilterCluster());
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('Logs every minute');
    //         setRefresh(!refresh)
    //     }, 4000);
    //     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    // }, [])
    useEffect(() => {
        // console.log(features);
        let modiZones = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }
        modiZones = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': features
            }
        }
        // console.log(modiZones);
        setCreatedFeatures(modiZones)

    }, [features])
    useEffect(() => {
        console.log(createdFeatures);
    }, [createdFeatures])
    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = { ...currFeatures };
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    const DrawControl = (props) => {
        // console.log(props, "props");
        useControl(
            (draw) => {
                const map = mapRef
                map.current.on('draw.create', (e) => setFeatures([...features, e.features[0]]));
                map.current.on('draw.update', (e) => setFeatures([...features, e.features[0]]));
                map.current.on('draw.delete', (e) => props.onDelete);
                return new MapboxDraw(props);
            },
            (draw) => {
                const map = mapRef
                map.current.off('draw.create', (e) => setFeatures([...features, e.features[0]]));
                map.current.off('draw.update', (e) => setFeatures([...features, e.features[0]]));
                map.current.off('draw.delete', (e) => props.onDelete);
            },
            {
                position: props.position
            }
        );

        return null;
    }

    useEffect(() => {
        const clusterVal = localStorage.getItem('clustring')
        if (clusterVal === null || clusterVal === 'null')
            localStorage.setItem('clustring', false)
        const markerVal = localStorage.getItem('pimMarker')
        if (markerVal === null || markerVal === 'null')
            localStorage.setItem('pimMarker', "pin-marker-custom")
    }, [])

    const handleMarkers = async () => {
        // setState({ markerShown: !state.markerShown })
        const clustringVal = localStorage.getItem('clustring')
        await localStorage.setItem('clustring', clustringVal === 'false' ? true : false)
        // await forceUpdate()
        // await console.log(clustringVal);
        // setRefresh(!refresh)
        window.location.reload(false)
        // await setState({name:Math.random()})
    }

    //     useEffect(() => {
    //  let data = {
    //     "type": "FeatureCollection",
    //     "features":[]
    //  }
    //  let mapingData = props.plantMC
    //  for (let index = 0; index < mapingData.length; index++) {
    //     const element = mapingData[index];
    // const pushingData = {
    //     "type": "Feature",
    //     "geometry": {
    //         "type": "Point",
    //         "coordinates": [
    //             element.Longitude,
    //             element.Latitude
    //         ]
    //     },
    //     "properties": element
    // }
    //     data.features.push(pushingData)
    // }
    // console.log(data,'datarendering')

    //     }, [])
    useEffect(() => {
        setRefresh(!refresh)
    }, [pinMarker])
    // useEffect(async () => {
    //     await setRefresh(!refresh)
    //     // await console.log(displayColors, "displayColors");
    //     if (displayColors.length !== 0) {
    //         handlingColors()
    //     }
    // }, [displayColors])
    useEffect(() => {
        setRefresh(!refresh)
        // console.log(colorPicker);
    }, [colorPicker])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [zoneOpacity])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [siteOpacity])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [showClusters])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [clusterData])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [clusterDataFiltered])
    useEffect(() => {
        setRefresh(!refresh)
        // alert(zoneOpacity)
    }, [zoneLabel])
    useEffect(() => {
        // console.log(pinInfo);
    }, [pinInfo])
    useEffect(() => {
        setRefresh(!refresh)
        // console.log(displayColorsID);
    }, [displayColorsID])
    useEffect(() => {
        setRefresh(!refresh)
    }, [assetDataCopy])
    useEffect(() => {
        setRefresh(!refresh)
        // console.log(assetData, "assetDataassetData");
    }, [assetData])
    useEffect(() => {
        setRefresh(!refresh)
    }, [byCluster])

    const handlePolygon = async (event) => {
        setPolygon(!polygon)
    }
    const clusterDataSaving = (epc) => {
        let pinDataCluster = clusterDataFiltered.filter((item =>
            item?.properties?.HandlingUnit === epc
        ))
        console.log(pinDataCluster);
        let newArray = []
        const BOXName = pinDataCluster[0]?.properties?.Pack_Code;
        const Points = pinDataCluster[0].geometry?.coordinates;
        var points = point(
            Points
        );
        for (let index = 0; index < BoxData.features.length; index++) {
            const PointsProperties = BoxData.features[index];
            const BOX = PointsProperties?.geometry.coordinates;
            var searchWithin = ShowPolygon(
                BOX
            );

            var ptsBoolean = booleanPointInPolygon(points, searchWithin)
            var ptsWithin = pointsWithinPolygon(points, searchWithin);
            if (ptsBoolean) {
                newArray.push({
                    "type": "FeatureCollection",
                    "features": [PointsProperties]
                })
            }
        }
        // console.log(newArray.filter((item => item.features.length !== 0)), 'newArray')
        const filterData = newArray.filter((item => item.features.length !== 0))
        setPointers(filterData)
        console.log(pinDataCluster[0], 'pinDataCluster');
        setPinInfo(pinDataCluster[0])
        setShowClusters(false)
        onSidebarClicked()
    }
    const onClickMap = event => {
        const feature = event.features[0];
        console.log(feature);
        // const feature = event.features[0];
        // console.log(feature);


        // const clusterId = feature?.properties?.cluster_id;

        if (feature?.source === 'point' && props.clustering === true) {
            var features = mapRef.current.queryRenderedFeatures(event.point, { layers: ['clusters'] });
            var clusterId = features[0]?.properties?.cluster_id,
                point_count = features[0]?.properties?.point_count,
                clusterSource = mapRef.current.getSource(/* cluster layer data source id */'point');
            if (clusterId) {

                const mapboxSource = mapRef.current.getSource('point');
                // mapboxSource.getClusterChildren(clusterId, function (err, aFeatures) {
                //     // console.log('getClusterChildren', aFeatures);
                //     setShowClusters(true)
                //     setClusterData(aFeatures)
                //     setClusterDataFiltered(aFeatures)
                // });
                mapboxSource.getClusterLeaves(clusterId, point_count, 0, function (err, aFeatures) {
                    setShowClusters(true)
                    setClusterData(aFeatures)
                    console.log(aFeatures, 'ad');
                    setClusterDataFiltered(aFeatures)
                    // setPointers({
                    //     "type": "FeatureCollection",
                    //     "features": [aFeatures]
                    // })
                })
                mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
                    if (err) {
                        return;
                    }

                    mapRef.current.easeTo({
                        center: feature?.geometry?.coordinates,
                        // center: [-1.5412187576293945, 53.827052679920456],
                        zoom,
                        duration: 500
                    });
                });
            } else {
                let newArray = []
                const BOXName = feature?.properties?.Pack_Code;
                const Points = feature.geometry?.coordinates;
                var points = point(
                    Points
                );
                for (let index = 0; index < BoxData.features.length; index++) {
                    const PointsProperties = BoxData.features[index];
                    const BOX = PointsProperties?.geometry.coordinates;
                    var searchWithin = ShowPolygon(
                        BOX
                    );

                    var ptsBoolean = booleanPointInPolygon(points, searchWithin)
                    var ptsWithin = pointsWithinPolygon(points, searchWithin);
                    if (ptsBoolean) {
                        newArray.push({
                            "type": "FeatureCollection",
                            "features": [PointsProperties]
                        })
                    }
                }
                // console.log(newArray.filter((item => item.features.length !== 0)), 'newArray')
                const filterData = newArray.filter((item => item.features.length !== 0))
                setPointers(filterData)
                setShowClusters(false)
                onSidebarClicked()
            }

        } else if (feature?.source === 'point' && props.clustering === false) {


            let newArray = []
            const BOXName = feature?.properties?.Pack_Code;
            const Points = feature.geometry?.coordinates;
            var points = point(
                Points
            );
            for (let index = 0; index < BoxData.features.length; index++) {
                const PointsProperties = BoxData.features[index];
                const BOX = PointsProperties?.geometry.coordinates;
                var searchWithin = ShowPolygon(
                    BOX
                );

                var ptsBoolean = booleanPointInPolygon(points, searchWithin)
                var ptsWithin = pointsWithinPolygon(points, searchWithin);
                if (ptsBoolean) {
                    newArray.push({
                        "type": "FeatureCollection",
                        "features": [PointsProperties]
                    })
                }
            }
            // console.log(newArray.filter((item => item.features.length !== 0)), 'newArray')
            const filterData = newArray.filter((item => item.features.length !== 0))
            setPointers(filterData)
            setShowClusters(false)
            onSidebarClicked()



        }
        else if (feature?.source === 'boxData') {
            let newArray = []
            const BOXName = feature?.properties?.name;
            const BOX = feature.geometry?.coordinates;
            var searchWithin = ShowPolygon(
                BOX
            );


            for (let index = 0; index < props.plantMC.features.length; index++) {
                const PointsProperties = props.plantMC.features[index];
                const Points = PointsProperties?.geometry.coordinates;
                var points = point(
                    Points
                );
                var ptsBoolean = booleanPointInPolygon(points, searchWithin)
                if (ptsBoolean) {
                    newArray.push({
                        "type": "FeatureCollection",
                        "features": [PointsProperties]
                    })
                }
            }
            // console.log(newArray.filter((item => item.features.length !== 0)), 'newArray')
            const filterData = newArray.filter((item => item.features.length !== 0))
            setPointers(filterData)
            setShowClusters(false)
            onSidebarClicked()
        } else {
            setPointers([{ type: 'pin' }])
        }
        if (feature?.properties) {
            // console.log(feature, "feature");
            setByCluster(false)
            console.log(feature, 'featurefeature');
            setPinInfo(feature)
            // onSidebarClicked()

            // mapRef.current.easeTo({
            //     center: feature?.geometry?.coordinates,
            //     zoom: 17,
            //     duration: 500
            // });

        }
    };
    const onSidebarClicked = () => {
        setSidebarToggler(!sidebarToggler)
    }
    // useEffect(() => {
    //     if (mapRef?.current?.isSourceLoaded('point')) {
    //         console.log(mapRef?.current?.getSource('point'));
    //     } else {
    //         console.log('loading');
    //     }
    //     // console.log(mapRef.current.isSourceLoaded('point'), 'mapRef.current');
    // }, [mapRef?.current?.isSourceLoaded('point')]);
    const zoomToLevel = (props) => {
        mapRef.current.easeTo({
            // center: feature?.geometry?.coordinates,
            center: props.lats,
            zoom: props.zoom,
            duration: 500
        });
    }
    const clustringVal = localStorage.getItem('clustring')
    const markerVal = localStorage.getItem('pimMarker')
    const polygonLayerOne = {
        'type': 'fill',
        'source': 'boxData',
        'id': "boxData",
        'layout': {},
        'paint': {
            'fill-color': { 'type': 'identity', 'property': 'zone_color' },
            'fill-opacity': zoneOpacity
        }
    }
    const polygonLayerOneCreated = {
        'type': 'fill',
        'source': 'boxData',
        'id': "boxData",
        'layout': {},
        'paint': {
            'fill-color': "#8aacff",
            'fill-opacity': zoneOpacity
        }
    }
    const polygonLayerTwp = {
        'id': 'outline',
        'type': 'line',

        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 2
        }
    }
    const polygonLayerNames = {
        type: 'symbol',
        "duplicate": false,
        "symbol-placement": 'point',
        layout: {
            'text-field': { 'type': 'identity', 'property': 'name' },
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 15,
            "text-allow-overlap": false,
            'visibility': zoneLabel ? 'visible' : 'none'
        },
        paint: {
            "text-color": "#ffffff",
            "text-halo-color": '#000',
            "text-halo-width": 2,
        }
    }
    const iconsOptions = [
        { title: "Marker", value: 'a', icon: <i style={{ "--color": colorPicker }} class="icon-map-marker" /> },
        { title: "Thumb Tack", value: 'b', icon: <i style={{ "--color": colorPicker }} class="icon-thumb-tack" /> },
        { title: "Pinterest", value: 'c', icon: <i style={{ "--color": colorPicker }} class="icon-pinterest" /> },
        { title: "Location", value: 'd', icon: <i style={{ "--color": colorPicker }} class="icon-ios-location" /> },
        { title: "Location-IOS", value: 'e', icon: <i style={{ "--color": colorPicker }} class="icon-location" /> },
        { title: "Pin", value: 'f', icon: <i style={{ "--color": colorPicker }} class="icon-pin" /> },
        { title: "Map", value: 'g', icon: <i style={{ "--color": colorPicker }} class="icon-map" /> },
        { title: "Pin Map", value: 'h', icon: <i style={{ "--color": colorPicker }} class="icon-pin-1" /> },
        { title: "Flag", value: 'i', icon: <i style={{ "--color": colorPicker }} class="icon-flag" /> },
        { title: "Pin New", value: 'j', icon: <i style={{ "--color": colorPicker }} class="icon-pin-2" /> },
        { title: "Book", value: 'k', icon: <i style={{ "--color": colorPicker }} class="icon-book" /> },
        { title: "Bookmark", value: 'l', icon: <i style={{ "--color": colorPicker }} class="icon-book-bookmark" /> },
        { title: "Book-2", value: 'm', icon: <i style={{ "--color": colorPicker }} class="icon-book-1" /> },
        { title: "Close", value: 'n', icon: <i style={{ "--color": colorPicker }} class="icon-book-close" /> },
        { title: "telescope", value: 'o', icon: <i style={{ "--color": colorPicker }} class="icon-telescope" /> },
    ]
    return (
        <React.Fragment>
            <MapDrawer numberOfPoints={pointers} byCluster={byCluster} togglerFunction={onSidebarClicked} togglerVal={sidebarToggler} pinData={pinInfo} />
            <Drawer
                anchor={"left"}
                open={filterToggler}
                onBackdropClick={() => setFilterToggler(!filterToggler)}
            >
                <div className='map-drawer-bg' style={{ width: "500px" }} >
                    <div className='map-drawer'>
                        <div className='map-drawer-content ml-5 mt-5'>
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={assetId}
                                defaultValue={assetId}
                                onChange={(e) => setassetId(e.target.value)}
                                label="QR Code Handling Unit"
                                placeholder="QR Code Handling Unit"
                            />
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={serialNumer}
                                defaultValue={serialNumer}
                                onChange={(e) => setserialNumer(e.target.value)}
                                label=" Material Code"
                                placeholder=" Material Code"
                            />
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={itemCategory}
                                defaultValue={itemCategory}
                                onChange={(e) => setitemCategory(e.target.value)}
                                label="Batch"
                                placeholder="Batch"
                            />
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={level}
                                defaultValue={level}
                                onChange={(e) => setlevel(e.target.value)}
                                label="Grade"
                                placeholder="Grade"
                            />
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={roomNo}
                                defaultValue={roomNo}
                                onChange={(e) => setroomNo(e.target.value)}
                                label="QTY"
                                placeholder="QTY"
                            />
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={description}
                                defaultValue={description}
                                onChange={(e) => setdescription(e.target.value)}
                                label="Box Grid Name"
                                placeholder="Box Grid Name"
                            />

                            {/* <RangePicker
                                className='ant-custom'
                                showTime={{ use12Hours: true, use24Hours: false, defaultValue: moment('00:00:00', 'HH:mm:ss:a'), allowClear: true }}
                                format="YYYY-MM-DD HH:mm:ss:a"
                                placeholder={['Starting Prod Date', 'Ending Prod Date']}
                                // className="input-mat-1"
                                style={{ border: '1px solid white', borderRadius: 5, height: 55, marginTop: 10, fontWeight: 'lighter', width: 300 }} size={'large'}
                                value={LastDetectDate}
                                onChange={(e) => setLastDetectDate(e)}
                            /> */}
                            <button class="btn-hover  color-5 w-28 h-9" onClick={() => filterData()} style={{ borderRadius: 3, marginLeft: 0 }}>Search</button>
                        </div>
                    </div>
                </div>
            </Drawer>
            <Drawer
                anchor={"left"}
                open={showClusters}
                onBackdropClick={() => setShowClusters(!showClusters)}
            >
                <div className='map-drawer-bg' style={{ width: "25vw", minWidth: "300px", position: 'relative' }} >
                    <div className='map-drawer' style={{ padding: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField
                                style={{ width: '300px', marginTop: '10px' }}
                                value={clusterEpcVal}
                                defaultValue={clusterEpcVal}
                                onChange={(e) => setClusterEpcVal(e.target.value)}
                                label="Handling Unit"
                                placeholder="Handling Unit"
                            />
                            <button class="btn-hover  color-5 w-28 h-9" onClick={() => filterDataCluster()} style={{ borderRadius: 3, marginLeft: 0 }}>Search</button>
                        </div>
                        {/* <div className='map-drawer-content'> */}
                        {clusterData?.map((item, index) =>

                            // <div className='map-drawer-content-data'>
                            <h1 style={{ cursor: 'pointer' }} onClick={(e) => clusterDataSaving(item?.properties?.HandlingUnit)} key={index} className='map-drawer-content-data-heading-sub'>{item?.properties?.HandlingUnit}</h1>
                            // </div>
                        )}
                        {/* </div> */}

                    </div>
                </div>
            </Drawer>


            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                onBackdropClick={() => setShowIcon(!showIcon)}
                open={showIcon}
                fullWidth={true}
                maxWidth="md"
            >
                <DialogTitle id="customized-dialog-title"
                >
                    <Typography>Select Icon and Color</Typography>
                </DialogTitle>
                <DialogContent style={{ width: '100%' }} dividers>
                    <Typography>
                        <SketchPicker width="150px" className="color-picker" disableAlpha color={colorPicker}
                            onChangeComplete={(color, event) => handleChangeComplete(color, event)}
                            onChange={(color, event) => handleChangeComplete(color, event)}
                        />
                    </Typography>
                    <Autocomplete freeSolo
                        style={{ width: '300px', marginTop: '10px', marginLeft: 5 }}
                        id="tags-outlined"
                        options={iconsOptions}
                        getOptionLabel={(option) => option.title}
                        disableClearable={true}
                        value={{ title: iconVal.title, value: iconVal.value }}
                        onChange={(e, currentValue) =>
                            setIconVal(currentValue)
                        }
                        filterSelectedOptions
                        renderOption={(props, option) => (
                            <Box component="li" sx={{ '& > i': { mr: 2, flexShrink: 0 } }} {...props}>
                                {option.icon}
                                {option.title}
                            </Box>
                        )}
                        renderInput={(params) => (
                            < TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: iconVal.icon ? iconVal.icon : <i style={{ "--color": colorPicker }} class="icon-map-marker" />
                                }}
                                label="Select Icon"
                                placeholder="Select Icon"
                                style={{ width: '300px' }}
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setShowIcon(!showIcon)} class="btn-hover  color-4 w-24 h-7" style={{ borderRadius: 3, marginLeft: 0 }}>Close</button>
                </DialogActions>
            </BootstrapDialog>
            <div style={{
                position: 'absolute',
                right: "150px",
                zIndex: 123,
                top: 50,
                width: 150,
                display: zoneSliderToggler === true || siteSliderToggler === true ? 'flex' : "none",
                height: '100%',
                justifyContent: 'center',
            }}>
                <Slider
                    sx={{
                        '& input[type="range"]': {
                            WebkitAppearance: 'slider-vertical',
                        },
                        height: '200px',
                        position: 'relative',
                        backgroundColor: 'black',
                        padding: '10px',
                        display: zoneSliderToggler !== true && "none",
                        margin: '10px'
                    }}
                    orientation="vertical"
                    defaultValue={0.5}
                    max={1}
                    min={0}
                    step={0.1}
                    value={zoneOpacity}
                    aria-label="Zone Opacity"
                    onChange={(e) => setZoneOpacity(e.target.value)}
                />
                <Slider
                    sx={{
                        '& input[type="range"]': {
                            WebkitAppearance: 'slider-vertical',
                        },
                        height: '200px',
                        position: 'relative',
                        backgroundColor: 'black',
                        padding: '10px',
                        display: siteSliderToggler !== true && "none",
                        margin: '10px'
                    }}
                    orientation="vertical"
                    defaultValue={0.5}
                    max={1}
                    min={0}
                    step={0.1}
                    value={siteOpacity}
                    aria-label="Site Opacity"
                    onChange={(e) => setSiteOpacity(e.target.value)}
                />
            </div>
            <div

                style={{
                    position: "absolute",
                    right: 0,
                    // top: 35,
                    zIndex: 4,
                    minWidth: "110px",
                    minHeight: "max-content",
                    height: "100%",
                    backdropFilter: "blur(8px)",
                    overflowY: "auto",
                    overflowX: "show",
                    background: '#1c804f4d'
                }}
                className="map-right-side"
            >
                <button onClick={() => setZoneSliderToggler(!zoneSliderToggler)} className="layers layers-1">
                    <BsBoundingBoxCircles size={23} fill={'white'} />
                    <h1 className="layers-h1">Zone opacity</h1>
                </button>
                <button onClick={() => setSiteSliderToggler(!siteSliderToggler)} className="layers layers-1">
                    <BsFillMapFill size={20} fill={'white'} />
                    <h1 className="layers-h1">Map opacity</h1>
                </button>
                <button onClick={() => props.clusteringfunction()} className="layers layers-1">
                    <GiMushroomsCluster size={25} fill={'white'} />
                    <h1 className="layers-h1">Clustering</h1>
                </button>
                <button onClick={() => onSidebarClicked()} className="layers layers-1">
                    <BiDetail size={25} fill={'white'} />
                    <h1 className="layers-h1">Open Details</h1>
                </button>
                <button onClick={() => props.refreshfunction()} className="layers layers-1">
                    <IoMdRefreshCircle size={25} fill={'white'} />
                    <h1 className="layers-h1">Refresh</h1>
                </button>
                <button onClick={() => setFilterToggler(!filterToggler)} className="layers layers-1">
                    <AiFillFilter size={25} fill={'white'} />
                    <h1 className="layers-h1">Fitlers</h1>
                </button>
                <button onClick={() => setZoneLabel(!zoneLabel)} className="layers layers-1">
                    <BiRename size={25} fill={'white'} />
                    <h1 className="layers-h1">Toggle Zone Name</h1>
                </button>
            </div>
            {mapLoader ?
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        flexDirection: "column",
                        alignItems: "center",
                        alignSelf: "center",
                        height: "100%",
                        backgroundColor: "rgba(28, 28, 28, 0.8)",
                        zIndex: 130582349582340985230,
                        left: 0,
                        top: 0,
                    }}
                >

                    <ClipLoader
                        color={"white"}
                        loading={true}
                        size={100}
                    />
                </div>
                :
                <ReactMapGL
                    onClick={onClickMap}
                    // onMove={(evt) => console.log(evt)}
                    ref={mapRef}
                    antialias={false}
                    interactiveLayerIds={[polygonLayerOne.id, polygonLayerOneCreated.id, demoLayer.id, clusterLayer.id, clusterCountLayer.id]}
                    initialViewState={{
                        longitude: 55.788525,
                        latitude: 25.68516,

                        zoom: 19
                    }}

                    mapboxAccessToken='pk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2wxd250eThmMDJncTNjc2oyZ2RncTRvdSJ9.1TOmktpX9nX9MH07aym5fQ'
                    style={{ width: '100%', height: '91vh' }}
                    mapStyle="mapbox://styles/sirajmuneer/cl1zbtrm2003315qritdd4dhe"
                // mapStyle="mapbox://styles/sirajmuneer/cl1ze4dyl00al14mp2fdx4uet"

                >
                    <Source
                        id="map-source"
                        type="raster"
                        tiles={["https://api.mapbox.com/styles/v1/sirajmuneer/cl6o2y3jg000f15uh38a3rt6c/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2wxd250eThmMDJncTNjc2oyZ2RncTRvdSJ9.1TOmktpX9nX9MH07aym5fQ"]}
                        // tiles={["https://api.mapbox.com/styles/v1/sirajmuneer/cl5urevlu000o15pdm3ws4iau/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2lyYWptdW5lZXIiLCJhIjoiY2wxd250eThmMDJncTNjc2oyZ2RncTRvdSJ9.1TOmktpX9nX9MH07aym5fQ"]}
                        tileSize={256}
                    >
                        <Layer
                            id="map-source-layer"
                            source="map-source"
                            type="raster"
                            minzoom={0}
                            maxzoom={22}
                            paint={{ "raster-opacity": siteOpacity, 'raster-fade-duration': 0 }}
                        />
                    </Source>
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />
                    <Source
                        id='boxData' type="geojson" data={BoxData}>
                        <Layer id="anytihng" source="boxData"{...polygonLayerOneCreated} />
                        <Layer id={'anything'} source='boxData' {...polygonLayerTwp} />
                        <Layer id={'label'} source='boxData' {...polygonLayerNames} />
                    </Source>
                    {/* <Source

                        id="point" type="geojson" data={props.plantMC}>
                        <Layer {...demoLayer} />
                    </Source> */}
                    <Source
                        cluster={props.clustering}
                        buffer={512}
                        clusterMaxZoom={20}
                        clusterRadius={30}
                        clusterProperties
                        id="point" type="geojson" data={assetData}>
                        <Layer  {...clusterLayer} />
                        <Layer {...clusterCountLayer} />
                        <Layer paint={{ 'circle-opacity': 1 }} {...demoLayer} />
                        <Layer paint={{ 'circle-opacity': 1 }} {...demoLayerPink} />
                    </Source>
                </ReactMapGL>

            }

        </React.Fragment >
    )
}

export default MapView