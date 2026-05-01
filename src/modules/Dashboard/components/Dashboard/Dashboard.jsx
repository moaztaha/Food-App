import React from 'react'
import Header from "../../../Shared/components/Header/Header";
import headerImg from "../../../../assets/images/header-girl.png"

export default function Dashboard() {
  return (
    <Header
      title={"Welcome"}
      description={
        "This is a welcoming screen for the entry of the application , you can now see the options"
      }
      imgUrl={headerImg}
    />
  );
}
