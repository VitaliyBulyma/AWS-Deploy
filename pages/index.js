import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import axios from 'axios';
import moment from 'moment';
import Link from 'next/link';
import { API } from '../config';

const Home = ({ categories }) => {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        loadPopular();
    }, []);

    const loadPopular = async () => {
        const response = await axios.get(`${API}/link/popular`);
        // console.log(response);
        setPopular(response.data);
    };

    const handleClick = async linkId => {
        const response = await axios.put(`${API}/click-count`, { linkId });
        loadPopular();
    };

    const listOfLinks = () =>
        popular.map((l, i) => (
            <div key={i} className="row alert alert-secondary p-2 shadow-sm mb-3">
                <div className="col-md-8 " onClick={() => handleClick(l._id)}>
                    <a href={l.url} target="_blank">
                        <h5 className="pt-2">{l.title}</h5>
                        <h6 className="pt-2 text-danger" style={{ fontSize: '0.9rem' }}>
                            {l.url}
                        </h6>
                    </a>
                </div>

                <div className="col-md-4 pt-2">
                    <span className="pull-right">
                        {moment(l.createdAt).fromNow()} by {l.postedBy.name}
                    </span>
                </div>

                <div className="col-md-12">
                    <span className="badge text-dark">
                        {l.type} / {l.medium}
                    </span>
                    {l.categories.map((c, i) => (
                        <span key={i} className="badge text-success">
                            {c.name}
                        </span>
                    ))}
                    <span className="badge text-secondary pull-right">{l.clicks} clicks</span>
                </div>
            </div>
        ));

    const listCategories = () =>
        categories.map((c, i) => (
            <Link key={i} href={`/links/${c.slug}`}>
                <a style={{  }} className="bg-light p-4 col-md-4 shadow mb-4">
                    <div>
                        <div className="row">
                            <div className="col-md-4 text-center">
                                <img
                                    src={c.image && c.image.url}
                                    alt={c.name}
                                    // style={{ maxWidth: '100px', maxHeight: '80px', borderRadius:'5px' }}
                                    className="shadow img-fluid"
                                />
                            </div>
                            <div className="col-md-8 d-none d-sm-block text-center">
                                <h3>{c.name}</h3>
                                <div className="row d-none d-lg-block">
                                    <p> {c.content.replace(/(<([^>]+)>)/gi, "")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        ));

    return (
        <Layout>
            <div className="jumbotron jumbotron-fluid">
                <div className="container-fluid">
                    <h1 className=" text-center"><strong style={{fontSize: "2em"}}>Tutorials Sharing Portal</strong></h1>
                    <hr className="my-4" />
                    <p className="lead text-center">Browse and share you favorite resources to learn programming </p>
                </div> 
            
            </div>
            <div className="row">{listCategories()}</div>
            <div className="row pt-5">
                <h2 className="font-weight-bold pb-3">Trending </h2>
                {<div className="col-md-12 overflow-hidden">{listOfLinks()}</div>}
            </div>
            <Footer />
        </Layout>
    );
};

Home.getInitialProps = async () => {
    const response = await axios.get(`${API}/categories`);
    return {
        categories: response.data
    };
};

export default Home;
