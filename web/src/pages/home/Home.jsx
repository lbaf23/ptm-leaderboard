import React from "react";
import {Button, Card, Image} from "antd";

import img from "../../assets/index-logo.svg"
import "./index.css"

const title = 'Pre-Trained Models Attack Benchmark';
const content = 'The Pre-trained Models Attack Benchmark (PTMA) benchmark is a collection of resources for training, evaluation and analyzing drawbacks and weakness of large pre-trained systems. PTMA consists of: ' +
  '\n\n' +
  'A benchmark of  language understanding and generation tasks built on established existing datasets and selected to cover high-performance pre-trained models and under-attack scenarios.' +
  '\n\n' +
  'A public leaderboard for tracking performance on the benchmark .' +
  '\n\n' +
  'The format of the PTMA benchmark is black-box, so any attack method capable of generating adversarial examples is eligible to participate. The benchmark tasks are selected so as to favor models that exhibitate  SOTA performance. The ultimate goal of PTMA is to drive research in the development of safe and powerful pre-trained models for the next generation of AI systems.';



function Home() {
  return (
    <Card
      bordered={false}
      hoverable
      style={{
        textAlign: 'center',
      }}
    >
      <h1 className="title">{title}</h1>
      <Image src={img} preview={false}/>
      <p className="content">{content}</p>
      <p className="bt-content">
        <Button>PAPER</Button>&nbsp;&nbsp;&nbsp;
        <Button>STARTER CODE</Button>
      </p>
    </Card>
  )
}

export default Home;
