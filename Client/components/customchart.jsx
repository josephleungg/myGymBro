import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const fullWidth = Dimensions.get('window').width;

export default function CustomChart({ chartData }) {
  return (
    <View className="flex-1">
      <VictoryChart
        // theme={VictoryTheme.material}
        style={{
          }}
      >
        <VictoryLine
          style={{
            data: { stroke: "#FF9C01" },
            parent: { border: "10px solid #ccc"}
          }}
          data={[
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 4 },
            { x: 5, y: 7 }
          ]}
        />
      </VictoryChart>
    </View>
  )
}