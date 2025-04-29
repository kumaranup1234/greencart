import toast from "react-hot-toast";
import React, {useEffect, useState} from "react";
import axios from "axios";
import TotalComponent from "../../components/seller/analytics/TotalComponent.jsx";
import TopList from "../../components/seller/analytics/TopList.jsx";
import LineChartVisualize from "../../components/seller/analytics/LineChartVisualize.jsx";
import PaymentTypeCard from "../../components/seller/analytics/PaymentTypeCard.jsx";

const Analytics = () => {
    const [data, setData] = useState({})
    const getAnalytics = async ()=> {
        try {
            const { data } = await axios.get('/api/seller/analytics/summary');
            setData(data)
            console.log(data.analytics)
            if(data.success){
                toast.success("Analytics Data Loaded")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAnalytics();
    },[])

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">Platform Overview</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl w-full overflow-hidden rounded-md">
                        <TotalComponent heading="Total Registered Users" info={data.analytics?.totalUsers} />
                        <TotalComponent heading="Active Products" info={data.analytics?.totalProducts} />
                        <TotalComponent heading="Total Orders Placed" info={data.analytics?.totalOrders} />
                        <TotalComponent heading="Revenue Collected" info={data.analytics?.revenueData.totalRevenue} />
                        <TotalComponent heading="Pending Payments" info={data.analytics?.revenueData.pendingAmount} />
                        <PaymentTypeCard heading="Orders by Payment Method" paymentTypeCount={data.analytics?.paymentTypeCount} />
                    </div>

                    <h2 className="pb-4 text-lg font-medium">Product Performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl w-full overflow-hidden rounded-md">
                        <TopList heading="Top Selling Product" products={data.analytics?.topSellingProducts.mostOrderedProduct} />
                        <TopList heading="Lowest Selling Product" products={data.analytics?.topSellingProducts.leastOrderedProducts} />
                    </div>

                    <h2 className="pb-4 text-lg font-medium">Sales & Revenue Trends</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl w-full overflow-hidden rounded-md">
                        <LineChartVisualize heading="Order Per Day" LineData={data.analytics?.ordersPerDay} dataPoint="count"/>
                        <LineChartVisualize heading="Revenue Per Day" LineData={data.analytics?.revenueTrend} dataPoint="amount"/>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Analytics
