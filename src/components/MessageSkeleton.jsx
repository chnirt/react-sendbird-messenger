import React, { Fragment } from "react";
import { Space, Skeleton, Divider } from "antd";

export function MessageSkeleton({
  loading = false,
  rows = 1,
  children,
  size = "default",
  avatar,
  avatarShape = "circle",
}) {
  if (loading) {
    const isAuthor = Boolean(Math.round(Math.random()));

    return [...Array(rows).keys()].map(() => (
      <Fragment>
        <Space style={{ padding: 12, height: 60 }}>
          {!!avatar && (
            <Skeleton.Avatar active={true} size={size} shape={avatarShape} />
          )}
          <Skeleton.Input
            style={{ minWidth: 308, width: 355 }}
            active={true}
            size={size}
          />
        </Space>
        <Divider style={{ margin: 0 }} />
      </Fragment>
    ));
  }

  return children;
}
