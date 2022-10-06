import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'


export default function World() {
  const engine = useWorld()
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
        <model src="castle.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} allColliders="trimesh"/> 
        <model src="accessories.glb" position={[0,8.7,0]} rotation={[0,0,0]} scale={7} allColliders="trimesh"/>
        <model src="stand.glb" position={[-3,-0.2,-28]} scale={1} allColliders="trimesh"/> 
        <model src="landscape.glb" position={[0,9,0]} scale={7} allColliders="trimesh"/>
        <model src="mountain_pass1.glb" position={[0,8.9,0]} scale={7} allColliders="trimesh"/>
        <model src="house1.glb" position={[0,9,0]} scale={7} allColliders="trimesh"/>
        <model src="road.glb" position={[0,9,0]} scale={7} allColliders="trimesh"/>
        </rigidbody>

      {/*Respawn Portals*/}
        
          {/*Throne*/}
          {<group position={[4.7,1.3,7.5]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={3}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-3, 3, -28], 175) 
              }}
            />
          </group>}
         
          {/*FrontRight*/}
          {<group position={[-20.6,23.2,14.4]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={2}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-3, 3, -28], 175) //frontright
              }}
            />
          </group>}
          
          {/*FrontLeft*/}
          {<group position={[14.2,23.2,14.4]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={2}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-3, 3, -28], 175)
              }}
            />
          </group>}
         
          {/*BackLeft*/}
          {<group position={[14.8,27.9,38.6]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={2}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-3, 3, -28], 175)
              }}
            />
          </group>}

          {/*Mountain Pass*/}
          {<group position={[177.4,49.8,33]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={2}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-3, 3, -28], 175)
              }}
            />
          </group>}
      
      {/*Castle Passable*/}
        <model src="castle_passable.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} />
        <model src="mountain_pass_passable.glb" position={[0,9,0]} scale={7} />
        <model src="mountain_pass_armies.glb" position={[0,9,0]} scale={7} />

        <model src="levelup.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://levelup.ancestors.digital/', true)}}
          />
        <model src="staking.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://staking.ancestors.digital/descendants', true)}}
          />
        <model src="dreamtools_chart.glb" position={[0,9,0]} rotation={[0,0,0]} scale={7} 
          onClick={e => {engine.open('https://dreamtools.app/collections/descendants', true)}}
          />
         
         {/*Mission Portals*/}
         {/*throneroom*/}
          <model src="desc_portal1.glb" position={[-28,10,0]} rotation={[0,0,0]} scale={8}
                onClick={e => {
                  console.log(e)
                  e.avatar.teleport([7, 2, 24], 200)}}
              />
          {<group position={[-12, 0, -12.5]}>
            <box size={[2, 0.1, 2]} color="white" opacity={0}/>
            <trigger
              size={3}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([7, 2, 24], 200) }}
            />
          </group>}
          {<billboard position={[-12, 3.7, -12]} axis="y">
            <text
              value={'Throne Room'}
              bgColor="black"
              color="white"
              bgRadius={0.1}
              padding={0.2}
            />
          </billboard>}

         {/*backleft*/}
          <model src="desc_portal2.glb" position={[-28,10,0]} rotation={[0,0,0]} scale={8}
          onClick={e => {
                console.log(e)
                e.avatar.teleport([15,28,36], 20) }}
            />
          {<group position={[-20, 0, -12.5]}>
            <box size={[2, 0.1, 2]} color="white" opacity={0}/>
            <trigger
              size={3}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([15,28,36], 20) }}
            />
          </group>}
          {<billboard position={[-20, 3.7, -12]} axis="y">
            <text
              value={'Castle Turret'}
              bgColor="black"
              color="white"
              bgRadius={0.1}
              padding={0.2}
            />
          </billboard>}

         {/*frontright ([-21,23.3,12], 20)*/}

         {/*mountain pass*/}
          <model src="desc_portal3.glb" position={[0,10,0]} rotation={[0,0,0]} scale={8}
                onClick={e => {
                  console.log(e)
                  e.avatar.teleport([146,25,45.8], 270) }}
              />
          {<group position={[-16, 0, -12.5]}>
            <box size={[2, 0.1, 2]} color="white" opacity={0}/>
            <trigger
              size={3}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([177,49.9,25], 270) }}
            />
          </group>}  
            
          {<billboard position={[-16, 3.7, -12]} axis="y">
            <text
              value={'Mountain Pass'}
              bgColor="black"
              color="white"
              bgRadius={0.1}
              padding={0.2}
            />
          </billboard>}

         {/*frontleft*/}
            <model src="desc_portal4.glb" position={[0,10,0]} rotation={[0,0,0]} scale={8}
            />

        {/*Maze Portals*/}
        
          {/*Throne*/}
          {<group position={[42.2,1.05,-120.6]}> 
          <model src="stand.glb" scale={0.5}/>
          <trigger
              size={3}
              onEnter={avatarId => {
                engine.getAvatar(avatarId).teleport([-19.5, 1.1, -24.75], 90) 
              }}
            />
          </group>}


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
