import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

import { Tween } from './Tween'
const anim = new Tween({ z: -30 }) //demon
  .to({ z: -17 }, 7, Tween.QUAD_IN_OUT)
  .to({ z: -30 }, 7, Tween.QUAD_IN_OUT)
  .loop()

const anim2 = new Tween({ x: 39 }) //ghost
  .to({ x: 23 }, 4, Tween.QUAD_IN_OUT)
  .wait(1.5)
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
const schema2 = {
  id: 'Quest2',
  origin: 'test',
  text: `I wouldn't go down there if I was you.`,
}

export default function World() {
  const bodyRef = useRef()
  const bodyRef2 = useRef()
  const engine = useWorld()
  const world = useWorld()
  const [mineActive, setMineActive] = useState(false)
  const [view, setView] = useState(false)
  const [view2, setView2] = useState(false)

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
      body.setPositionX(anim2.value.x)
    })
  }, [])

  let animation = mineActive ? 'Attack' : 'Walking'
  let animation2 = mineActive ? 'Attack' : 'Idle'
  let animation3 = mineActive ? 'Attack' : 'Idle'

  function death() {
    setMineActive(true)
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'haunted-maze'), 1000)
    setTimeout(() => setMineActive(false), 1100)
    setTimeout(() => world.chat(`${name} has been eviscerated.`), 1100)
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
        <group position={[0, 13, -22]} ref={bodyRef2}>
          <model src="ghost.glb" rotation={[0, -90, 0]} />
          <trigger
            size={[2, 4, 2]}
            position={[-0.5, 1, 0]}
            onEnter={() => ghosted()}
          />
        </group>
      }

      <place
        label="haunted-respawn"
        position={[-11.5, 15, -24]}
        rotationY={-50}
      />
      <place
        label="haunted-admin"
        position={[-36.5, 18.6, -3.3]}
        rotationY={5}
      />
      <place label="haunted-maze" position={[5, 2.5, -5]} rotationY={5} />

      <Dialog schema={schema} onView={setView} position={[3, 0, 0]}></Dialog>

      <Dialog
        schema={schema2}
        onView={setView2}
        position={[1, 13.8, -6]}
      ></Dialog>

      <model src="spearman.glb" />
      <model
        src="DemonIdle.glb"
        position={[29, 2.5, -23.5]}
        rotation={[0, -45, 0]}
        animate={animation3}
      />
      <trigger
        size={[3, 4, 3]}
        position={[29, 3.5, -23.5]}
        onEnter={() => death()}
        debug
      />

      <rigidbody>
        <model
          src="testcastle.glb"
          allColliders="trimesh"
          position={[0, 15, -0]}
        />
        <model
          src="spearman.glb"
          position={[1, 12.8, -6]}
          rotation={[0, 210, 0]}
        />
      </rigidbody>
    </app>
  )
}
