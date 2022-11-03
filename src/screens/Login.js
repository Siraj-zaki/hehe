import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../css/Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/inn.png'
import api from '../services/api';
import jwt_decode from "jwt-decode";
import ClipLoader from "react-spinners/ClipLoader";
export class Login extends Component {
    state = {
        username: '',
        password: '',
        rememberme: false,
        loading: false,
    }
    loginFunction = (e) => {
        e.preventDefault()
        if (this.state.username === "" && this.state.password === "") {
            toast.error("Please Enter Username and Password")
        } else if (this.state.username === "") {
            toast.error("Please Enter Username")
        } else if (this.state.password == "") {
            toast.error("Please Enter Password")
            // } else if (this.state.username !== "admin" || this.state.password !== "admin") {
            //     return toast.error("Please Login with correct credentials")
            // } 
        }
        else {
            toast.success("Login Successfull")
            setTimeout(() => {
                window.location.href = "/"
            }, 1000);
        }
    }
    componentDidMount() {
        console.log(localStorage.getItem('login'), 'local');
    }
    async signIn(e) {
        e.preventDefault()
        this.setState({ loading: true })
        let user = {
            userName: this.state.username,
            password: this.state.password
        }
        try {
            const userLogin = await api.login(user)
            console.log(userLogin, "userLogin");
           await localStorage.setItem('login', true)

            console.log(localStorage.getItem('login'));
            var decoded = jwt_decode(userLogin.token);
            console.log(decoded.payload.result);
            await  localStorage.setItem('userLogin', JSON.stringify(decoded.payload.result))
            console.log(localStorage.getItem('userLogin'));
            // this.props.userLogin({ user: decoded.payload.result, login: true, })
            toast.success("Login Successfull")
            this.setState({ loading: false })
            // this.props.loginFunction(true)
            setTimeout(() => {
                window.location.href = "/"
            }, 500);

        } catch (err) {
            console.log(err, "as1231");
            this.setState({ loading: false })
            toast.error("Email Or Password in Incorrect")
        }
    }
    render() {
        // console.log(this.props.user, this.props.login, 'redux');
        return (
            <div class="main h-100 w-100 login-bg-img" >
                <nav class="navbar navbar-expand-lg navbar-light white" >
                    <a class="navbar-brand" href="#">
                        <img style={{ objectFit: 'contain' }} src={Logo} height="100" width="200" alt="Logo" class="logo" />
                    </a>
                </nav>
                <div class="loader" style={{ display: "none" }}></div>
                <div class="container" id="login_form_main">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 col-md-6 offset-md-3">
                            <form onSubmit={(e) => this.signIn(e)} id="login_form" class="box" autocomplete="off">
                                <h1 class="text-center white mb-4 font-weight-bold" style={{ fomtSize: "30px" }}>Welcome Back</h1>
                                <div class="field" >
                                    <div class="msg"></div>
                                </div>
                                <div class="form-group mb-2">
                                    <input value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} type="text" id="username" name="username" placeholder="Username" class="form-control pb-4 pl-0" />
                                </div>
                                <div class='error error_username'>
                                </div>
                                <div class="form-group">
                                    <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" id="password" name="password" placeholder="Password" class="form-control pb-4 pl-0" />
                                </div>
                                <div class="error error_password">
                                </div>
                                <div class="form-check">
                                </div>
                                <input type="hidden" id='token' name="token" value="123456"></input>
                                {/* <button type="submit" id="submit" type="submit" class="mt-4 w-100">Login</button> */}

                                <button style={{ cursor: 'pointer' }} type="submit" id="submit" className="mt-4 w-100 login-btn" > <ClipLoader color={'white'} loading={this.state.loading} size={20} /> {this.state.loading ? null : "Login"}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export default Login

export default Login