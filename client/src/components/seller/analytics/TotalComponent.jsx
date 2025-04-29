import { assets } from "../../../assets/assets.js";
import {Grid} from "lucide-react";
const TotalComponent = ({ heading, info }) => {
    return (
        <div>
            <div className="p-6 rounded-lg border border-gray-500/20">
                <div className="flex items-center mb-4">
                    <Grid className="w-5 h-5 mr-2 text-gray-500" />
                    <p className="text-base font-bold">{heading}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                        <img src={assets.orbIcon} alt="orbIcon" className="w-8 h-8 mr-2" />
                        <p className="text-lg font-bold">{info}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalComponent