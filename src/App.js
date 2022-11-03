
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'antd/lib/date-picker/style';
import 'antd/lib/date-picker/style/css';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { withRouter } from './components/withRouter';

import Login from './screens/Login';
import MapWrapper from './screens/MapWrapper';
import api from './services/api';
// import ActiveReport from './screens/ActiveReport';
function App() {
  const [headerName, setHeaderName] = useState('Reports')
  const [sidebarName, setSidebarName] = useState('Reports')
  const [refresh, setRefresh] = useState(false)
  const [loginVal, setLoginVal] = useState(false)
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const gettingName = (name) => {
    setHeaderName(name)
  }
  const gettingNameSideBar = (name) => {
    setSidebarName(name)
  }
  const gettingLogin = (value) => {
    setLoginVal(value)
  }
  useEffect(async () => {

    const filters = localStorage.getItem("FILTERS")
    if (filters === null || filters === "null" || filters === "") {
      const allFilters = await api.getFilters()
      // console.log(allFilters, "allFilters");
      await localStorage.setItem("FILTERS", JSON.stringify(allFilters?.filters))
    }
    // console.log(JSON.parse(localStorage.getItem("FILTERS")), "filters");
  }, [])

  useEffect(() => {
    // console.log("name Function is called");
    console.log(sidebarName, 'sidebarName');
  }, [sidebarName])
  useEffect(() => {
    // window.location.reload()
    if (localStorage.getItem('login') === 'false' || localStorage.getItem('login') === 'null' || localStorage.getItem('login') === null) {
      setRefresh(!refresh)
    }
    console.log(JSON.parse(localStorage.getItem('userLogin')), "userLogin");
    console.log(JSON.parse(localStorage.getItem('login')), "login");
  }, [localStorage.getItem('login')])

  return (
    <React.Fragment>
      <ToastContainer className="toastify-custom-class" />
      <ThemeProvider theme={darkTheme}>
        <div className='flex flex-col flex-wrap  bg-cover custom_bg backdrop-blur-sm'>
          <div className="flex bg-cover custom_bg_color ">
            <div class="w-full h-full flex flex-col justify-start align-top  overflow-y-auto" style={{ marginLeft: 0, minHeight: '100vh', width: '100%' }}>
              <Routes>
                {localStorage.getItem("login") === 'true' ?
                  <React.Fragment>
                    <Route path="/" element={<MapWrapper screenName={"Map"} />} />
                    {/* <Route path="/Login" element={<Login loginFunction={(value) => gettingLogin(value)} screenName={"Associated"} />} /> */}
                    <Route path="/MapReport" element={<MapWrapper screenName={"Map"} />} />
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Route path="/Login" element={<Login loginFunction={(value) => gettingLogin(value)} screenName={"Login"} />} />
                    <Route
                      path="*"
                      element={<Navigate to="/Login" replace />}
                    />
                  </React.Fragment>
                }
              </Routes>
            </div>
          </div>
        </div>
      </ThemeProvider>

    </React.Fragment>
  );
}
export default withRouter(App);


