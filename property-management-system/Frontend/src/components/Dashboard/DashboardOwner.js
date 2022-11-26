import ReactEcharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewsPerLocation } from 'services/ReportService';
import './DashboardOwner.scss';

const DashboardOwner = () => {
    const dispatch = useDispatch();
    const viewsPerLocation = useSelector((state) => state.report.viewsPerLocation);

    const [viewsPerLocationChartOption, setViewsPerLocationChartOption] = useState({});

    useEffect(() => {
        dispatch(getViewsPerLocation());
    }, [dispatch]);

    useEffect(() => {
        if (viewsPerLocation?.length > 0) {
            setViewsPerLocationChartOption({
                xAxis: {
                    type: 'category',
                    data: viewsPerLocation.map(c => c.city)
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: viewsPerLocation.map(c => c.views),
                        type: 'bar'
                    }
                ]
            })
        }
    }, [viewsPerLocation]);

    return (
        <div className="container dashboard">
            <h2>Dashboard Owner</h2>
            <div className="row">
                <div className="col">
                    <h4>Property views by location</h4>
                    <ReactEcharts option={viewsPerLocationChartOption} />
                </div>
            </div>
        </div>
    );
};

export default DashboardOwner;