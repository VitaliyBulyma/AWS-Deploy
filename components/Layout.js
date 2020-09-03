import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, logout } from '../helpers/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();


const Layout = ({ children }) => {
    const head = () => (
        <React.Fragment>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"
            />
            <link rel="stylesheet" href="/static/css/styles.css" />
            <link rel="stylesheet" href="https://bootswatch.com/4/sketchy/bootstrap.css" />

            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>

        </React.Fragment>
    );

    const nav = () => (
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-light">Home</a>
                </Link>
            </li>
            <li className="nav-item">
                <Link href="/user/link/create">
                    <a className="nav-link text-light btn btn-success" style={{borderRadius: '0px'}}>Submit a link</a>
                </Link>
            </li>

            {process.browser && !isAuth() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link text-light">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/register">
                            <a className="nav-link text-light">Register</a>
                        </Link>
                    </li>
                </React.Fragment>
            )}

            { process.browser && isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-light">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            { process.browser && isAuth() && isAuth().role === 'subscriber' && (
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-light">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            { process.browser && isAuth() && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link text-light">
                        Logout
                    </a>
                </li>
            )}
        </ul>
    );

    return (
        <React.Fragment>
            {head()} {nav()} <div style={{height:'80vh'}} className="container pt-5 pb-5">{children}</div>
        </React.Fragment>
    );
};

export default Layout;
