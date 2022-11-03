import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useEffect } from 'react';


export default function MapDrawer({ pinData, togglerFunction, togglerVal, byCluster, numberOfPoints }) {
    const [toggler, setToggler] = React.useState(true)
    const [mconData, setMconData] = React.useState(null)
    const [assetDetails, setAssetDetails] = React.useState([{
        asset_EPC: '----',
        Room_no: '----',
        Serial_no: '----',
        "Owner Group": '----',
        Asset_Location: '----',
        Description: '----',
        Brand: '----',
        Item_Category: '----',
        Maintenance_Period: '----',
        last_cycle_date: '----',
    }])
    function formatDateTime(dateString) {

        // E2806894000040055C054C56
        if (dateString.length !== 13) {
            return new Date(dateString).toLocaleString("en-Us", "Asia/Muscat")
        } else {
            var timestamp = Number(dateString)
            var date = new Date(timestamp).toLocaleString("en-Us", "Asia/Muscat");
            console.log(date, timestamp);
            return date
        }
    }
    const [data, setData] = React.useState({})
    useEffect(() => {
        setToggler(togglerVal)
    }, [togglerVal])
    useEffect(() => {
        if (byCluster) {
            setData(pinData[0])

            if (pinData[0]?.properties?.operation === 'MCON') {
                setMconData(pinData[0]?.properties?.mConData)
            } else {
                setMconData(null)
            }
            console.log(pinData[0]?.properties);
            if (pinData[0]?.properties?.assetDetails) {
                setAssetDetails(pinData[0]?.properties?.assetDetails)
                // console.log(pinData[0]?.properties?.assetDetails);
            }
        }

        else {
            if (pinData?.properties?.assetDetails) {
                if (pinData?.properties?.operation === 'MCON') {
                    setMconData(JSON.parse(pinData?.properties?.mConData))
                } else {
                    setMconData(null)
                }
                setData(pinData)
                console.log(pinData);
                setAssetDetails(JSON.parse(pinData?.properties?.assetDetails))
                // console.log(JSON.parse(pinData?.properties?.assetDetails));
            }
        }

    }, [pinData])


    return (
        <div>
            <React.Fragment  >
                <Drawer

                    anchor={"left"}
                    open={toggler}
                    onBackdropClick={() => togglerFunction()}
                >
                    <div className='map-drawer-bg'>
                        <div className='map-drawer'>
                            <div className='map-drawer-content'>
                                {
                                    pinData?.properties?.name &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>name</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.name}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.description &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Description:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.description.replace('0    <br>       <br>   Name   ', '')}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.HandlingUnit &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>Qr Code - Handling Unit:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.HandlingUnit}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.ProductionDate &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Production_Date:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.ProductionDate}</h1>
                                    </div>
                                }

                                {
                                    pinData?.properties?.Material_Code &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>Material_Code:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Material_Code}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.Grade &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Grade:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Grade}</h1>
                                    </div>
                                }

                                {
                                    pinData?.properties?.Batch &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>Batch:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Batch}</h1>
                                    </div>
                                }



                                {
                                    pinData?.properties?.Size_Dimensions &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Size_Dimensions:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Size_Dimensions}</h1>
                                    </div>
                                }

                                {
                                    pinData?.properties?.Qty &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>Qty:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Qty}</h1>
                                    </div>
                                }


                                {
                                    pinData?.properties?.LocationDetails &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>LocationDetails:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.LocationDetails}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.StorageLocation &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> StorageLocation:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.StorageLocation}</h1>
                                    </div>
                                }

                                {
                                    pinData?.properties?.BinLocation &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>BinLocation:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.BinLocation}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.Lane &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Lane:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Lane}</h1>
                                    </div>
                                }

                                {
                                    pinData?.properties?.lastDetectTime &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>lastDetectTime:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.lastDetectTime}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.Longitude &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Longitude:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Longitude}</h1>
                                    </div>
                                }
                                {
                                    pinData?.properties?.Longitude &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'> Latitude:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'>{pinData?.properties?.Latitude}</h1>
                                    </div>
                                }


                                {
                                    pinData?.properties?.ImageURL &&
                                    <div className='map-drawer-content-data'>
                                        <h1 className='map-drawer-content-data-heading-main'>Image:</h1>
                                        <h1 className='map-drawer-content-data-heading-sub'><img width={'100%'} height={200} src={pinData?.properties?.ImageURL} /></h1>
                                    </div>
                                }

                                {numberOfPoints?.length !== 0 && numberOfPoints[0]?.type === 'pin' ?
                                    null :
                                    numberOfPoints[0]?.features[0]?.properties?.name ?
                                        < div className='map-drawer-content-data'>
                                            <h1 className='map-drawer-content-data-heading-main'>Box Grid Name :</h1>
                                            <h1 className='map-drawer-content-data-heading-sub'>{numberOfPoints[0]?.features[0]?.properties?.name}</h1>
                                        </div>
                                        :
                                        pinData?.properties?.name ?
                                            < div className='map-drawer-content-data'>
                                                <h1 className='map-drawer-content-data-heading-main'>Number of Pins :</h1>
                                                <h1 className='map-drawer-content-data-heading-sub'>{numberOfPoints.length}</h1>
                                            </div>
                                            : null
                                }


                                {/* <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Odoo_tag:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails ? assetDetails['Thing Serial'] : ''}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Room_no:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Room_no}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Serial_no:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Serial_no}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Owner Group:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.["Owner Group"] ? assetDetails["Owner Group"] : '---'}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Asset_Location:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Asset_Location}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Description:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Description}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Brand:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Brand}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Item_Category:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Item_Category}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>Maintenance_Period:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.Maintenance_Period}</h1>
                                </div>
                                <div className='map-drawer-content-data'>
                                    <h1 className='map-drawer-content-data-heading-main'>last_cycle_date:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{assetDetails?.last_cycle_date}</h1>
                                </div>
                                <div className='map-drawer-content-data'>

                                    <h1 className='map-drawer-content-data-heading-main'>Last Detect Time:</h1>
                                    <h1 className='map-drawer-content-data-heading-sub'>{mconData !== null ? formatDateTime(mconData?.timestamp) : assetDetails?.last_detect_date}</h1>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>

        </div >
    );
}