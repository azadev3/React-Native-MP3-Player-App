const { View } = require("react-native")
import React from "react"
import { screenWidth } from "../global/Dimensions";
const Borderline = () => {
    return (
        <View style={{borderWidth: 0.6, borderColor: '#37306B', width: screenWidth}}/>
    )
}

export default Borderline;