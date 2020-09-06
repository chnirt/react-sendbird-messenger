import React, { Fragment } from "react";
import { Button } from "antd";

import { Emoji } from "./Emoji";

export function Emoticons({ handleEmoji = () => {} }) {
  return (
    <Fragment>
      <Button onClick={() => handleEmoji("love")} type="text" size="small">
        <Emoji label="love" symbol="❤️" />
      </Button>
      <Button onClick={() => handleEmoji("smile")} type="text" size="small">
        <Emoji label="smile" symbol="😆" />
      </Button>
      <Button onClick={() => handleEmoji("subscribe")} type="text" size="small">
        <Emoji label="subscribe" symbol="😮" />
      </Button>
      <Button onClick={() => handleEmoji("cry")} type="text" size="small">
        <Emoji label="cry" symbol="😢" />
      </Button>
      <Button onClick={() => handleEmoji("angry")} type="text" size="small">
        <Emoji label="angry" symbol="😠" />
      </Button>
      <Button onClick={() => handleEmoji("like")} type="text" size="small">
        <Emoji label="like" symbol="👍" />
      </Button>
      <Button onClick={() => handleEmoji("dislike")} type="text" size="small">
        <Emoji label="dislike" symbol="👎" />
      </Button>
    </Fragment>
  );
}
