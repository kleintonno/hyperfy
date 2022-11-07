import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
const anim = new Tween({ z: -8.5 })
  .to({ z: -20 }, 4, Tween.QUAD_IN_OUT)
  .to({ z: -8.5 }, 4, Tween.QUAD_IN_OUT)
  .loop()

const anim2 = new Tween({ z: -20 })
  .to({ z: -8.5 }, 3, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .to({ z: -20 }, 3, Tween.QUAD_IN_OUT)
  .loop()

const anim3 = new Tween({ z: -8.5 })
  .to({ z: -20 }, 3.5, Tween.QUAD_IN_OUT)
  .to({ z: -8.5 }, 3.5, Tween.QUAD_IN_OUT)
  .loop()

const anim4 = new Tween({ z: -20 })
  .to({ z: -8.5 }, 2.5, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .to({ z: -20 }, 2.5, Tween.QUAD_IN_OUT)
  .loop()

{
  /*Launcher*/
}
const anim5 = new Tween({ z: -52 })
  .to({ z: -61 }, 2, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .to({ z: -52 }, 2, Tween.QUAD_IN_OUT)
  .loop()

{
  /*Launcher
  const anim5 = new Tween({ y: 80 },{ z: -20 })
  .to({y: 70, z: -8.5 }, 3, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .to({ y: 80, z: -20 }, 3, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .loop()
*/
}

export default function World() {
  const bodyRef = useRef()
  const bodyRef2 = useRef()
  const bodyRef3 = useRef()
  const bodyRef4 = useRef()
  const bodyRef5 = useRef()
  const engine = useWorld()
  const world = useWorld()

  {
    /*}
  function safetyNet1() {
    const name = world.getAvatar().name
    world.teleport(null, 'maze-start')
    world.chat(`${name} fell in stage 1!`)
  }
*/
  }
  useEffect(() => {
    const body = bodyRef.current
    return engine.onUpdate(() => {
      anim.set(engine.getServerTime())
      body.setPositionZ(anim.value.z)
    })
  }, [])
  useEffect(() => {
    const body = bodyRef2.current
    return engine.onUpdate(() => {
      anim2.set(engine.getServerTime())
      body.setPositionZ(anim2.value.z)
    })
  }, [])
  useEffect(() => {
    const body = bodyRef3.current
    return engine.onUpdate(() => {
      anim3.set(engine.getServerTime())
      body.setPositionZ(anim3.value.z)
    })
  }, [])
  useEffect(() => {
    const body = bodyRef4.current
    return engine.onUpdate(() => {
      anim4.set(engine.getServerTime() + 1)
      body.setPositionZ(anim4.value.z)
    })
  }, [])

  {
    /*Launcher*/
  }
  useEffect(() => {
    const body = bodyRef5.current
    return engine.onUpdate(() => {
      anim5.set(engine.getServerTime())
      {
        /*body.setPositionY(anim5.value.y)*/
      }
      body.setPositionZ(anim5.value.z)
    })
  }, [])

  return (
    <app>
      {/* elevator */}
      <rigidbody ref={bodyRef} type="kinematic" position={[-9, 32, 0]}>
        <model src="launcher2.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef2} type="kinematic" position={[-4.5, 32, 0]}>
        <model src="launcher2.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef3} type="kinematic" position={[0, 32, 0]}>
        <model src="launcher2.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef4} type="kinematic" position={[4.5, 32, 0]}>
        <model src="launcher2.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      {/*Launcher GLB*/}
      <rigidbody ref={bodyRef5} type="kinematic">
        <model
          src="launcher.glb"
          position={[-97.33, 59, 0]}
          scale={0.3}
          allColliders="trimesh"
        />
        <model
          src="launcher.glb"
          position={[-88.33, 57.15, 0]}
          scale={0.3}
          allColliders="trimesh"
        />
        <model
          src="launcher.glb"
          position={[-79.33, 55.15, 0]}
          scale={0.3}
          allColliders="trimesh"
        />
      </rigidbody>

      {/*  47733c floor 
      <rigidbody>
        <box size={[420, 0.1, 420]} color="#47733c" /> 
      </rigidbody> */}

      {/*Pattern Maze*/}
      <rigidbody>
        <model src="pattern maze_desc.glb" position={[16, 30, -27]} scale={1} />
      </rigidbody>
      {/*NFT Credits*/}
      {/*
        <billboard position={[-13, 34, -21]} axis="y">
          <text
            value={'Owned by @rganizedgeneral'}
            bgColor="blue"
            color="yellow"
            bgRadius={0.1}
            padding={0.2}
            onClick={e => {
              engine.open('https://twitter.com/rganizedgeneral', true)
            }} // open link in a new tab
          />
        </billboard>
      */}

      {/*Surrender*/}
      {
        <billboard position={[-142.2, 75, -23.5]} axis="y">
          <text
            value={'Surrender?'}
            bgColor="black"
            color="white"
            bgRadius={0.1}
            padding={0.2}
          />
        </billboard>
      }

      {/*Safety Net*/}
      <place label="pattern-start" position={[-140, 80, -22]} rotationY={-90} />
      <trigger
        position={[-120, 50, -20]}
        size={[50, 0.1, 15]}
        //onEnter={() => safetyNet1()}
      />
      <trigger
        position={[-104, 40, -35]}
        size={[15, 0.1, 32]}
        onEnter={() => world.teleport(null, 'pattern-start')}
      />

      <place
        label="pattern-checkpoint1"
        position={[-105, 100, -57]}
        rotationY={-90}
      />
      <trigger
        position={[-85, 35, -58]}
        size={[45, 0.1, 15]}
        onEnter={() => world.teleport(null, 'pattern-checkpoint1')}
      />
      <trigger
        position={[-68, 26, -30]}
        size={[15, 0.1, 50]}
        onEnter={() => world.teleport(null, 'pattern-checkpoint1')}
      />

      <place
        label="pattern-checkpoint2"
        position={[-67, 80, -13]}
        rotationY={-90}
      />
      <trigger
        position={[-40, 21, -14]}
        size={[50, 0.1, 25]}
        onEnter={() => world.teleport(null, 'pattern-checkpoint2')}
      />
      <trigger
        position={[-9, 15, -14]}
        size={[25, 0.1, 25]}
        onEnter={() => world.teleport(null, 'pattern-checkpoint2')}
      />

      {/*Checkpoint1*/}

      {
        <billboard position={[-106.7, 60, -59.5]} axis="y">
          <text
            value={'Checkpoint'}
            bgColor="black"
            color="white"
            bgRadius={0.1}
            padding={0.2}
          />
        </billboard>
      }

      {/*Checkpoint2*/}
      {
        <billboard position={[-74, 47, -19.5]} axis="y">
          <text
            value={'Checkpoint'}
            bgColor="black"
            color="white"
            bgRadius={0.1}
            padding={0.2}
          />
        </billboard>
      }

      {/*Exit*/}
      {
        <billboard position={[20, 34.9, -19.6]} axis="y">
          <text
            value={'Exit?'}
            bgColor="black"
            color="white"
            bgRadius={0.1}
            padding={0.2}
          />
        </billboard>
      }
    </app>
  )
}
