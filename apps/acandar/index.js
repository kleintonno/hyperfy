import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'


export default function World() {
  const engine = useWorld()
  const [visible1, setVisible1] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [visible4, setVisible4] = useState(false)
  const [visible5, setVisible5] = useState(true)
  const [visible6, setVisible6] = useState(true)

  return (
    <app>
     {/* <skysphere src="sky2.png" encoding="srgb" /> */}
  
      {/* Descendants Magic Eden link*/}
      {<billboard position={[-18, 1.7, -8]} axis="y">
        <text
          value={'Click here to purchase Descendants'}
          bgColor="black"
          color="white"
          bgRadius={0.1}
          padding={0.2}
          onClick={e => {engine.open('https://www.magiceden.io/marketplace/descendants', true)}} // open link in a new tab
        />
      </billboard>}



      {/*Castle Collisions*/}
      <rigidbody> 
        <model src="castle.glb" position={[0,0,0]} rotation={[0,0,0]} scale={7} allColliders="trimesh"/> 
        <model src="accessories.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} allColliders="trimesh"/>
        <model src="landscape.glb" position={[0,0,0]} scale={7} allColliders="trimesh"/>
        <model src="house1.glb" position={[0,9,0]} scale={7} allColliders="trimesh"/>
        <model src="road.glb" position={[0,9,0]} scale={7} allColliders="trimesh"/>
        <model src="bookshelf.glb" position={[0,0,0]} scale={7} allColliders="trimesh"/>
        <model src="table.glb" position={[0,0,0]} scale={7} allColliders="trimesh"/>
        <model src="otherchairs.glb" position={[0,0,0]} scale={7} allColliders="trimesh"/>

        <model src="questgiver_L3.glb" position={[0, 0, 0]} scale={7} onClick={() => (setVisible1(true),setVisible2(false),setVisible3(false),setVisible4(false),setVisible5(true),setVisible6(false))}/>

        {visible1 && (
        <model src="bluechair.glb" position={[0, 0, 0]} scale={7} onClick={() => (setVisible2(true))}/>
        )}

        {visible2 && (
        <model src="lamp.glb" position={[0, 0, 0]} scale={7} onClick={() => (setVisible3(true))}/>
        )}

        {visible3 && (
        <model src="greenbook.glb" position={[0, 0, 0]} scale={7} onClick={() => (setVisible4(true),setVisible5(false))}/>
        )}

        {visible4 && (
        <model src="door_open.glb" position={[0, 0, 0]} scale={7}/>
        )}

        {visible5 && (
        <model src="door_closed.glb" position={[0, 0, 0]} scale={7}/>
        )}
      
        {visible6 && (
        <model src="bluechair.glb" position={[0, 0, 0]} scale={7}/>
        )}
        </rigidbody>

      
      {/*Castle Passable*/}
        <model src="castle_passable.glb" position={[0,0,0]} rotation={[0,0,0]} scale={7} />
        <model src="levelup.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://levelup.ancestors.digital/', true)}}
          />
        <model src="staking.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://staking.ancestors.digital/descendants', true)}}
          />
        <model src="dreamtools_chart.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://dreamtools.app/collections/descendants', true)}}
          />
         
      {/* a trigger box that teleports when you walk on it */}
      {/*<group position={[-2, 0.05, -3]}>
        <box size={[2, 0.1, 2]} />
        <trigger
          size={2}
          onEnter={avatarId => {
            engine.getAvatar(avatarId).teleport([0, 0, 10])
          }}
        />
      </group>*/}

      {/* ground and spawn point */}
      {/*<spawn position={[-3, 3, -28]} rotation={180}/> */}
    </app>
  )
}
