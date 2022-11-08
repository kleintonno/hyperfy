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
      <rigidbody ref={bodyRef} type="kinematic" position={[-9, 0.5, 0]}>
        <model src="launcher.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef2} type="kinematic" position={[-4.5, 32, 0]}>
        <model src="launcher.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef3} type="kinematic" position={[0, 32, 0]}>
        <model src="launcher.glb" scale={0.4} allColliders="trimesh" />
      </rigidbody>

      <rigidbody ref={bodyRef4} type="kinematic" position={[4.5, 32, 0]}>
        <model src="launcher.glb" scale={0.4} allColliders="trimesh" />
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

      <trigger
        position={[-10, 0, -10]}
        size={[5, 5, 5]}
        onEnter={() => world.teleport(null, 'ghost-death')}
        debug
      />

      <place label="ghost-death" position={[0, 0, 0]} rotationY={-90} />

      {/*  47733c floor 
      <rigidbody>
        <box size={[420, 0.1, 420]} color="#47733c" /> 
      </rigidbody> */}
    </app>
  )
}
