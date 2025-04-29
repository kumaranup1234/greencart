import { Grid, CircleDot } from "lucide-react"

const PaymentTypeCard = ({ heading, paymentTypeCount }) => {
    return (
        <div className="p-4 rounded-lg border border-gray-500/20 h-full">
            <div className="flex items-center mb-4">
                <Grid className="w-5 h-5 mr-2 text-gray-500" />
                <p className="text-base font-bold">{heading}</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex items-center mb-2">
                    <CircleDot className="w-8 h-8 mr-2 text-gray-700" />
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-700">COD Orders:</p>
                            <p className="text-base font-bold text-blue-500">{paymentTypeCount?.cod}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-700">Online Orders:</p>
                            <p className="text-base font-bold text-green-500">{paymentTypeCount?.online}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentTypeCard
