import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

import { Tween } from './Tween'
const anim = new Tween({ z: -30 })
  .to({ z: -17 }, 7, Tween.QUAD_IN_OUT)
  .to({ z: -30 }, 7, Tween.QUAD_IN_OUT)
  .loop()

const anim2 = new Tween({ z: -33 })
  .to({ z: -16 }, 4, Tween.QUAD_IN_OUT)
  .wait(0.1)
  .loop()

const schema = {
  id: 'Quest1',
  origin: 'intro',
  views: {
    intro: {
      text: `Hey stranger, the castle is haunted. Haven't you heard?`,
      options: [{ text: 'I must enter!', goto: 'intro2' }],
    },
    intro2: {
      text: 'For 5 gold, I can look the other way. And shut the door behind you.',
      event: 'opendoor1',
    },
    youdied: {
      text: 'What a suprise! You died!',
      origin: 'youdied',
    },
  },
}

export default function World() {
  const bodyRef = useRef()
  const bodyRef2 = useRef()
  const engine = useWorld()
  const world = useWorld()
  const [mineActive, setMineActive] = useState(false)
  const [view, setView] = useState(false)
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

  let animation = mineActive ? 'Attack' : 'Walking'
  let animation2 = mineActive ? 'Attack' : 'Idle'
  let animation3 = mineActive ? 'Attack' : 'Idle'

  function death() {
    setMineActive(true)
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'haunted-respawn'), 1000)
    setTimeout(() => setMineActive(false), 1100)
    setTimeout(() => world.chat(`${name} has been eviscerated.`), 1100)
    origin = 'youdied'
  }

  function ghosted() {
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'haunted-respawn'), 500)
    setTimeout(() => world.chat(`A ghost claimed ${name}'s soul.`), 500)
  }

  return (
    <app>
      {
        <group position={[-15, 0, 0]} ref={bodyRef}>
          <model src="DemonWalking.glb" animate={animation} />
          <trigger
            size={[2, 4, 2]}
            position={[0, 1, 1.5]}
            onEnter={() => death()}
          />
        </group>
      }
      {
        <group position={[8.1, 10.2, 0]} ref={bodyRef2}>
          <model src="ghost.glb" />
          <trigger
            size={[2, 4, 2]}
            position={[0, 1, 0.5]}
            onEnter={() => ghosted()}
          />
        </group>
      }

      {/*
        <group position={[10, 0, 10]}>
          <model src="DemonIdle.glb" animate={animation2} />
          <trigger
            size={[2, 4, 2]}
            position={[0, 1, 1.5]}
            onEnter={() => death()}
          />
        </group>
    */}

      <place label="haunted-respawn" position={[0, 0, 4]} rotationY={30} />

      {/*  47733c floor 
      <rigidbody>
        <box size={[420, 0.1, 420]} color="#47733c" /> 
      </rigidbody> */}

      <Dialog schema={schema} onView={setView}></Dialog>
      <model src="spearman.glb" />
      <model src="hauntedcastle_passable.glb" />
      <model src="DemonIdle2.glb" animate={animation3} />
      <trigger
        size={[2, 4, 2]}
        position={[-7.6, 1, -7]}
        onEnter={() => death()}
      />

      <rigidbody>
        <model src="hauntedcastle.glb" allColliders="trimesh" />
      </rigidbody>
    </app>
  )
}
