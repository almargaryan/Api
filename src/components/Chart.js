import React from 'react';

const Chart = ({ users }) => {
    const getCountryCounts = () => {
        const countryCounts = {};
        users.forEach(user => {
            if (countryCounts[user.country]) {
                countryCounts[user.country]++;
            } else {
                countryCounts[user.country] = 1;
            }
        });
        return countryCounts;
    };


    const countryCounts = getCountryCounts();

    const chartData = Object.entries(countryCounts).map(([country, count]) => ({ country, count }));

    return (
        <div className="chart">
            <h2>Users by Country</h2>
            <div className="countryCount">
                {chartData.map(({ country, count }) => (
                    <div key={country} className={"bar"}>
                        <div>{country}</div>
                        <div>{count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chart;
