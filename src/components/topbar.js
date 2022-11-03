import React from 'react';
import { FaChartBar } from "react-icons/fa";
import { ImTable } from 'react-icons/im';
import { RiAdminLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

function Topbar({ gettingName }) {
    const topBarFunction = (e, route) => {
        gettingName(e.target.name)
        // setTimeout(() => {
        //     window.location.href = `/${route}`
        // }, 500);
    }
    return (
        <ul class="flex border-b border-slate-500">
            <HeaderLink route={"ZplPrinter"} onClick={(e) => topBarFunction(e, 'TagIt')} icon={<FaChartBar size={20} />} name={'Tag It'} />
            <HeaderLink route={"UserReport"} icon={<RiAdminLine size={20} />} onClick={(e) => topBarFunction(e, 'UserReport')} name={'Admin'} />
            <HeaderLink route={"AssociatedReport"} icon={<ImTable size={20} />} onClick={(e) => topBarFunction(e, 'AssociatedReport')} name={'Reports'} />
        </ul>
    )
}

export function HeaderLink({ name, icon, onClick, ref, route }) {

    return (
        <NavLink to={{ pathname: route }} onClick={onClick}>
            <a name={name} className="flex justify-evenly align-middle border-r border-gray-600 custom_siderbar transition-all hover:text-white hover:shadow-slate-700 shadow-md  inline-block py-2 px-4 text-white w-32 text-center font-semibold focus:text-sky-700 focus:bg-slate-400" >
                {icon}
                {name}</a>
        </NavLink>
    )
}
export default Topbar