import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

export function MessageBubble({
  w,
  h,
  backgroundColor = "#d9d9d9",
  color = "#000",
  content = "",
}) {
  return (
    <div
      style={{
        backgroundColor,
        borderRadius: 15,
        padding: "6px 12px 6px",
        width: w,
        height: h,
      }}
    >
      <Text
        style={{
          color,
        }}
      >
        {content}
      </Text>
    </div>
  );
}
