import { Button, Card, CardContent, Typography } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getTenLatestProperties,
    getSumRentTypeProperties,
    getSumSellTypeProperties,
    getTotalApplications
} from 'services/ReportService';
import './DashboardAdmin.scss';
import { currencyUSDFormatter } from 'Utils';

const DashboardAdmin = () => {
    const dispatch = useDispatch();
    const totalApplications = useSelector((state) => state.report.totalApplications);
    const sumSellTypeProperties = useSelector((state) => state.report.sumSellTypeProperties);
    const sumRentTypeProperties = useSelector((state) => state.report.sumRentTypeProperties);
    const tenLatestProperties = useSelector((state) => state.report.tenLatestProperties);

    const [tenLatestPropertiesChartOption, setTenLatestPropertiesChartOption] = useState({});

    useEffect(() => {
        dispatch(getTotalApplications());
        dispatch(getSumSellTypeProperties());
        dispatch(getSumRentTypeProperties());
        dispatch(getTenLatestProperties());
    }, [dispatch]);

    useEffect(() => {
        if (tenLatestProperties) {
            const data = tenLatestProperties.reduce((p, c) => {
                const city = c.location.city;

                if (!p.hasOwnProperty(city)) {
                    p[city] = 0;
                }

                p[city]++;

                return p;
            }, {});

            setTenLatestPropertiesChartOption({
                xAxis: {
                    type: 'category',
                    data: Object.keys(data)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: Object.values(data),
                        type: 'bar'
                    }
                ]
            });
        }
    }, [tenLatestProperties]);

    return (
        <div className="container dashboard-admin">
            <h2>Dashboard Admin</h2>
            <div className="row">
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <Card variant="outlined" className="card">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Applications
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {totalApplications}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <Card variant="outlined" className="card">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Sell
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        <NumericFormat value={sumSellTypeProperties} displayType={'text'}
                                                       thousandSeparator={true} prefix={'$'} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="row">
                        <div className="col-md-12">
                            <Card variant="outlined" className="card">
                                <CardContent>
                                    <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                        Rent
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        <NumericFormat value={sumRentTypeProperties} displayType={'text'}
                                                       thousandSeparator={true} prefix={'$'} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <Card variant="outlined" className="card big">
                        <CardContent>
                            <Typography className="card-title-block" sx={{fontSize: 14}} color="rgb(76, 215, 102)"
                                        gutterBottom>
                                <span className="card-title-text">21,425</span>
                            </Typography>
                            <div className="card-desc">
                                Properties for sale
                            </div>
                            <div className="card-details">
                                <div className="left-block">
                                    <span className="number">123,145</span>
                                    <span className="text">Total</span>
                                </div>
                                <div className="line">
                                    <span>&nbsp;</span>
                                </div>
                                <div className="right-block">
                                    <span className="number">68,127</span>
                                    <span className="text">Sold</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-md-3">
                    <Card variant="outlined" className="card big">
                        <CardContent>
                            <Typography className="card-title-block" sx={{fontSize: 14}} color="rgb(76, 215, 102)"
                                        gutterBottom>
                                <span className="card-title-text">44,954</span>
                            </Typography>
                            <div className="card-desc">
                                Properties for rent
                            </div>
                            <div className="card-details">
                                <div className="left-block">
                                    <span className="number">657,148</span>
                                    <span className="text">Total</span>
                                </div>
                                <div className="line">
                                    <span>&nbsp;</span>
                                </div>
                                <div className="right-block">
                                    <span className="number">145,453</span>
                                    <span className="text">Rented</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>10 latest properties</h4>
                    <div className="container">
                        <div className="row">
                            {tenLatestProperties.map(p => (
                                <div className="col-sm-4" key={p.id}>
                                    <div className="single-property property-tab-view">
                                        <div className="property-image">
                                            <div className="property-inner-image">
                                                <a href="#">
                                                    <img src={p.pictures[0]} alt="property" />
                                                </a>
                                            </div>
                                            <div className="property-attach">
                                                <div className="property-attach-price">
                                                    <h4>{currencyUSDFormatter.format(p.price)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="property-info">
                                            <div className="property-info-head">
                                                <Link to={"/property-detail/" + p.id}>
                                                    <i className="fa fa-map-marker"></i> <h3>{p.location.street}</h3>
                                                </Link>
                                            </div>
                                            <div className="property-info-list">
                                                <ul className="info-list-stats">
                                                    <li>
                                                        <i className="fa fa-bed"></i>
                                                        <span className="info-list-figure">{p.numOfRoom}</span> Rooms
                                                    </li>
                                                </ul>
                                                <Button href="#">View Property</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ReactEcharts option={tenLatestPropertiesChartOption} />
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;