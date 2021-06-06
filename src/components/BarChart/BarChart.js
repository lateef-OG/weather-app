import React from 'react';
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from 'recharts';

const BarChartContainer = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <Bar dataKey="temp" fill="#8884d8" radius={[7, 7, 0, 0]} maxBarSize={50}>
                <LabelList dataKey="temp" position="insideTop" style={{ fill: 'white'}} />
            </Bar>
            <XAxis dataKey="time" stroke={0} />
          </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartContainer
