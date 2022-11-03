import React from 'react';
import { BASE_URL } from '../config/Path';
import api from "../services/api";
import ClipLoader from "react-spinners/ClipLoader";
import { featureCollection, envelope, bbox, point, feature } from "@turf/turf";
import centroid from "@turf/centroid";
import MapView from "./MapView";
import axios from 'axios';
const ShopImage = 'https://svgshare.com/i/gUj.svg'
// import MarkerIconBlue from "../assets/marker-icon-blue.png";
// import MarkerIconGold from "../assets/marker-icon-gold.png";
// import MarkerIconGreen from "../assets/marker-icon-green.png";
// import MarkerShadow from "../assets/marker-shadow.png";

class MapWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sites: null,
            catego: null,
            siteId: '61b62968c72421b96dd9281b',
            assets: null,
            zones: null,
            pageRefresh: false,
            siteData: null,
            clustering: false,
            refresh: false,
            displayRules: null,
            filterdAssets: null,
            loading: false,
            zonesData: [],
            assetCollection: null,
            newData: {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        // These coordinates outline Maine.
                        'coordinates': [
                            [
                                [-67.13734, 45.13745],
                                [-66.96466, 44.8097],
                                [-68.03252, 44.3252],
                                [-69.06, 43.98],
                                [-70.11617, 43.68405],
                                [-70.64573, 43.09008],
                                [-70.75102, 43.08003],
                                [-70.79761, 43.21973],
                                [-70.98176, 43.36789],
                                [-70.94416, 43.46633],
                                [-71.08482, 45.30524],
                                [-70.66002, 45.46022],
                                [-70.30495, 45.91479],
                                [-70.00014, 46.69317],
                                [-69.23708, 47.44777],
                                [-68.90478, 47.18479],
                                [-68.2343, 47.35462],
                                [-67.79035, 47.06624],
                                [-67.79141, 45.70258],
                                [-67.13734, 45.13745]
                            ]
                        ]
                    }
                }
            }
        }
    }

    async componentDidMount() {
        // this.getAllSite();
        // this.GET_FILTERS();
        // this.getSite();
        this.get_Asset_by_site();
        // this.getZones();
    }
    getDisplayRules = async () => {
        let displayRules = await api.getMapFilter()
        if (displayRules) {
            this.setState({ displayRules })
        }
    }
    getAllSite = async () => {
        let sites = await api.getAllSite();
        this.setState({
            sites
        })
    }

    GET_FILTERS = async () => {
        let catego = await api.GET_FILTERS();
        this.setState({
            catego
        })
    }

    getLevel = async (siteId) => {
        return await fetch(BASE_URL + "/level/get/" + siteId).then(r => r.json())
    }

    getSite = async (siteId) => {
        var siteData = await fetch(BASE_URL + "/site/get/" + this.state.siteId).then((r) => r.json());
        this.setState({
            siteData
        })
    }

    get_Asset_by_site = async (siteId) => {
        this.setState({ loading: true })
        const { data } = await axios.get('https://new-sqcc-server.herokuapp.com/rackData/get')
        console.log(data, 'data');
        this.setState({ assetCollection: data })
        this.setState({ loading: false })

    }

    getZones = async (siteId) => {
        var zones = await fetch(BASE_URL + "/zone/get/" + this.state.siteId).then(r => r.json());
        let modiZones = {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        }

        for (let zone of zones) {

            try {
                const feat_geom = JSON.parse(zone.geoJson);
                const geoJson = {
                    'type': 'Feature',
                    'geometry': feat_geom,
                    "properties": {
                        zone_name: zone?.zone_name,
                        zone_color: zone?.fillColor || "#03fcad",
                    }
                }
                modiZones = {
                    'type': 'geojson',
                    'data': {
                        'type': 'FeatureCollection',
                        'features': [...modiZones?.data?.features, geoJson]
                    }
                }
            }
            catch (err) {
                console.log('zone error: ', err);
            }

        }
        console.log(modiZones, 'zones');
        this.setState({ zones: modiZones })
        this.setState({ zonesData: zones })
    }

    addLevel = async (view) => {
        return await fetch(BASE_URL + "/level/add/", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(view)
        })
    }

    deleteLevel = async (id) => {
        return await fetch(BASE_URL + "/level/delete/" + id, {
            method: 'delete'
        })
    }

    uploadFormData = async (formData) => {
        return await fetch(BASE_URL + "/upload", {
            method: "POST",
            body: formData,
            redirect: "follow",
        });
    }

    addSite = async (site) => {
        // here you can use site to access selected siteImage, SiteName and coordinates drawn
        return await fetch(BASE_URL + "/site/add", {
            method: "POST",
            body: JSON.stringify(site),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    addZone = async (zone) => {
        // here zone contains siteId on which it is created
        return await fetch(BASE_URL + "/zone/add", {
            method: "post",
            body: JSON.stringify(zone),
            headers: { "Content-Type": "application/json" },
        })
    }

    handleAssetSelection = (selectedAssets) => {
        // here you can use the selectedAssets
        console.log('Selected Assets: ', selectedAssets);
    }

    handleAssetClick = (clickedAsset) => {
        // here you can access the clickedAsset on clicking the asset
        console.log('Clicked Asset: ', clickedAsset);
    }

    handleClusterClick = (clickedCluster) => {
        // here you can access the clickedCluster on clicking the cluster
        console.log('Clicked Cluster: ', clickedCluster)
    }

    refreshMap = () => {
        this.setState({
            refresh: !this.state.refresh
        })
    }
    salalFunction = (data) => {
        // console.log("salalFunction");
        console.log(data, 'data');
        this.setState({ filterdAssets: data })
    }
    mapFilterHandler = (displayRules, assets) => {
        let salal = assets
        displayRules.map((item => {
            if (item.ruleOperator.value === "Includes") {
                salal = salal.map(f => ({
                    ...f,
                    assetDetails:
                        [
                            {
                                ...f.assetDetails[0],
                                asset_color: f?.assetDetails[0].Item_Category.includes(item?.value) ? item.colorValue : f?.assetDetails[0].asset_color,
                                asset_image: f?.assetDetails[0].Item_Category.includes(item?.value) ? item.pinImage?.value : f?.assetDetails[0].asset_image,
                                pinType: item.thingType?.label
                            }
                        ]

                }));
            }
            if (item.ruleOperator.value === "is Equal to") {
                salal = salal.map(f => ({
                    ...f,
                    assetDetails:
                        [
                            {
                                ...f.assetDetails[0],
                                asset_color: f?.assetDetails[0].Item_Category === item.property?.label ? item.colorValue : f?.assetDetails[0].asset_color,
                                asset_image: f?.assetDetails[0].Item_Category === item.property?.label ? item.pinImage?.value : f?.assetDetails[0].asset_image,
                                pinType: item.thingType?.label
                            }
                        ]
                }));
            }
        }))
        this.salalFunction(salal);
    }
    clusteringHandler = async (Val) => {
        console.log("called");
        await this.setState({ clustering: !this.state.clustering })
        console.log(this.state.clustering);
        this.forceUpdate()
    }
    refreshingHandler = async (Val) => {
        // console.log("called pageRefresh");
        // await this.setState({ pageRefresh: !this.state.pageRefresh })
        // console.log(this.state.pageRefresh);
        window.location.reload()
        this.forceUpdate()
    }

    render() {
        if (this.state.loading === true &&  this.state.assetCollection === null) return (
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
        );
        return (
            <>
                {this.state.clustering === true &&
                    <MapView plantMC={this.state.assetCollection} newData={this.state.newData} setLoadingTrue={() => this.setState({ loading: true })} setLoadingFalse={() => this.setState({ loading: false })} clustering={true} refreshfunction={() => this.refreshingHandler()} clusteringfunction={(clusteringVal) => this.clusteringHandler(clusteringVal)} asset={this.state.assetCollection} zones={this.state.zones} />
                }

                {this.state.clustering === false &&
                    <MapView plantMC={this.state.assetCollection} setLoadingTrue={() => this.setState({ loading: true })} setLoadingFalse={() => this.setState({ loading: false })} refreshfunction={() => this.refreshingHandler()} clustering={false} clusteringfunction={(clusteringVal) => this.clusteringHandler(clusteringVal)} asset={this.state.assetCollection} zones={this.state.zones} />
                }
            </>
        );
    }
}

export default React.memo(MapWrapper);