import React, { useEffect, useState } from 'react';
import { AiFillPrinter, AiFillTag } from 'react-icons/ai';
import { BsFillCloudUploadFill } from 'react-icons/bs';
import { FaCriticalRole, FaUserAlt } from 'react-icons/fa';
import { IoMdBarcode } from 'react-icons/io';
import { IoPricetags } from 'react-icons/io5';
import { MdCompassCalibration } from 'react-icons/md';
import { RiFileDamageFill, RiMastercardFill, RiShutDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import InnoventLogo from '../assets/Innovent.png';
function Sidebar({ headerName, gettingNameSideBar }) {
    const [gettingName, setGettingName] = useState('Reports')
    useEffect(() => {
        console.log(headerName, 'sidebar');
        setGettingName(headerName)
    }, [headerName])
    const topBarFunction = (e) => {
        gettingNameSideBar(e.target.name)
    }
    const logOut = () => {
        localStorage.setItem('login', false)
        setTimeout(() => {
            window.location.reload()
        }, 500);
    }
    return (
        <div className="background_image h-full" style={{ position: 'fixed', left: 0, top: 0 }}>
            <div className="flex flex-col w-64  h-screen px-4 py-8 overflow-y-auto  bg-cover  bg-opacity-10 shadow-xl  backdrop-blur-sm bg-slate-700/10">
                <h2 className="text-3xl font-semibold text-center text-blue-800"><img src={InnoventLogo} className="object-contain" /></h2>
                <div class="flex flex-col justify-between mt-6">
                    <aside>
                        <ul>
                            {gettingName === "Reports" ?
                                <React.Fragment>
                                    <SidebarIcon path={'/AssociatedReport'} onClick={topBarFunction} icon={<AiFillTag size={20} />} name="Associated" />
                                    <SidebarIcon path={'/NoAssociatedReport'} onClick={topBarFunction} icon={<AiFillTag size={20} />} name="Not Associated" />
                                    <SidebarIcon path={'/CountedReport'} onClick={topBarFunction} icon={<AiFillTag size={20} />} name="Counted" />
                                    <SidebarIcon path={'/TableReport'} onClick={topBarFunction} icon={<AiFillTag size={20} />} name="Table" />
                                    <SidebarIcon path={'/GFExitReport'} onClick={topBarFunction} icon={<AiFillTag size={20} />} name="GF Exit" />
                                    <SidebarIcon path={'/ItemMasterReport'} onClick={topBarFunction} icon={<RiMastercardFill size={20} />} name="Item Master" />
                                    <SidebarIcon path={'/ItemMasterUpload'} onClick={topBarFunction} icon={<BsFillCloudUploadFill size={20} />} name="Upload Data" />
                                    <SidebarIcon path={'/TagPrintingReport'} onClick={topBarFunction} icon={<AiFillPrinter size={20} />} name="Tag Printing" />
                                    <SidebarIcon path={'CalibrationReport'} onClick={topBarFunction} icon={<MdCompassCalibration size={20} />} name="Calibration" />
                                    <SidebarIcon path={'/MaintenanceReport'} onClick={topBarFunction} icon={<MdCompassCalibration color='white' fill='white' size={20} />} name="Maintenance" />
                                    <SidebarIcon path={'/DamagedReport'} onClick={topBarFunction} icon={<RiFileDamageFill size={20} />} name="Damaged" />
                                    <SidebarIcon path={'/RetaggingReport'} onClick={topBarFunction} icon={<IoPricetags size={20} />} name="Retagging" />
                                    <SidebarIcon path={'/MapReport'} onClick={topBarFunction} icon={<IoPricetags size={20} />} name="Map" />
                                </React.Fragment>
                                : null
                            }
                            {gettingName === "Tag It" ?
                                <React.Fragment>
                                    <SidebarIcon path={'/ZplPrinter'} onClick={topBarFunction} icon={<AiFillPrinter size={20} />} name="Zpl Printer" />
                                    <SidebarIcon path={'/ZplReport'} onClick={topBarFunction} icon={<AiFillPrinter size={20} />} name="Zpl Report" />
                                    {/* <SidebarIcon path={'/AddZpl'} onClick={topBarFunction} icon={<AiFillPrinter size={20} />} name="Add Zpl" /> */}
                                </React.Fragment>
                                : null
                            }
                            {gettingName === "Admin" ?
                                <React.Fragment>
                                    <SidebarIcon path={'/UserReport'} onClick={topBarFunction} icon={<FaUserAlt size={20} />} name="Users" />
                                    <SidebarIcon path={'/DeviceReport'} onClick={topBarFunction} icon={<IoMdBarcode size={20} />} name="Devices" />
                                    {/* <SidebarIcon path={'/'} onClick={topBarFunction} icon={<FaSitemap size={20} />} name="Sites" /> */}
                                    <SidebarIcon path={'/RoleReport'} onClick={topBarFunction} icon={<FaCriticalRole size={20} />} name="Roles" />
                                </React.Fragment>
                                : null
                            }
                        </ul>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <RiShutDownLine onClick={() => logOut()} style={{ cursor: 'pointer' }} size={'30px'} color='white' fill='white' />
                        </div>
                    </aside>

                </div>

            </div>
        </div>
    )
}
export function SidebarIcon({ name, icon, onClick, path }) {
    return (

        <li name={name} onClick={onClick}>
            <Link to={path} name={name} className="custom_siderbar flex items-center px-4 py-2 text-white transition-all hover:text-gray-400 text-md rounded-md mt-3 shadow-md" >
                {icon}
                <span name={name} className="mx-4 font-medium">{name}</span>
            </Link>
        </li>
    )
}

export default Sidebar