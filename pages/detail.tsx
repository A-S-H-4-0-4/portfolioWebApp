// style
import D from "../styles/detail.module.css";

// react
import React, { useEffect, useState } from "react";

// router
import { useRouter } from "next/router";


import "node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';


import MyCoolCodeBlock from "../components/codeBlock";
// import { CodeBlock } from "react-code-blocks";

const exampleCodeBlock = `def print_pattern():
size = 4
for i in range(size):
    print("*" * size)`;


const Details = () => {

  return (
    <React.Fragment >
      <div className={D.screen} style={{ background: "white" }}>
        <div className={D.video}>
          <Player
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"

          />
        </div>
        <h1 style={{ color: "black" }} >Heading</h1>
        <h3 style={{ color: "black" }}>sub-heading</h3>
        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quae pariatur unde ad modi dolores molestiae, sapiente consectetur excepturi? Facilis molestias corrupti quis enim maiores, assumenda voluptatum architecto reprehenderit iusto nobis doloremque incidunt necessitatibus debitis suscipit quia labore. Omnis sint dolorum, tempora ut deserunt quod perferendis? Veniam consequatur atque sunt iste, voluptas soluta quo cupiditate reiciendis id saepe vero voluptatem similique sapiente, dolor quidem facilis quasi nam magnam error quam iusto. Labore et architecto, deleniti unde voluptates officia expedita. Autem magnam in eius ab sunt vitae at, incidunt modi, ipsum similique obcaecati soluta assumenda, eligendi nihil laudantium eveniet? Atque, obcaecati. </p>
        {/* <CodeBlock code={exampleCodeBlock}
          language={"python"} /> */}
      </div>
    </React.Fragment >
  )

}


export default Details