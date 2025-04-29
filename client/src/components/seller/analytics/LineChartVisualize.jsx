import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {data} from "react-router-dom";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label, dataPoint }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-300 p-3 rounded shadow-md">
                <p className="font-medium">{`Date: ${label}`}</p>
                <p>{`Total ${dataPoint}: ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// Function to format date as "MM/DD"
const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    const options = { month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString(undefined, options).replace(/\//g, '/'); // Ensure MM/DD format
};

const LineChartVisualize = ({ heading, LineData, dataPoint }) => {
    return (
        <>
            <div className="rounded p-2 mx-auto border border-gray-500/20"
                                            style={{width: '100%', height: '365px', overflow: 'hidden'}}>
                    <h2 className="md:text-xl font-bold text-center mb-2">{heading}</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={LineData}
                            margin={{top: 10, right: 10, left: -20, bottom: 40}}
                        >
                            <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false}/>
                            <XAxis
                                dataKey="date"
                                angle={-45}
                                textAnchor="end"
                                tickFormatter={formatXAxis}
                                style={{fontSize: window.innerWidth < 768 ? '8px' : '10px'}}
                                padding={{left: 10, right: 10}} // add padding to avoid text overlap
                                axisLine={false} // hide the axis line
                                tickLine={false} // hide tick lines
                                tickMargin={4}
                            />
                            <YAxis
                                allowDecimals={false}
                                tickFormatter={(value) => Math.round(value)}
                                tickCount={6}
                                minTickGap={5}
                                axisLine={false} // Hides the Y-axis line
                                tickLine={false} // Hides the ticks on Y-axis
                            />
                            <Tooltip
                                content={<CustomTooltip dataPoint={dataPoint}/>}
                                cursor={false}
                            />
                            <Line
                                type="linear" // for straight line
                                dataKey={dataPoint}
                                stroke="#8884d8"
                                activeDot={{r: 8}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
        </>
    );
};

export default LineChartVisualize;
