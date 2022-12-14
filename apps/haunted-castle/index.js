import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

import { Tween } from './Tween'
const anim = new Tween({ z: -49 }) //demon
  .wait(0.25)
  .to({ z: -23.5 }, 10, Tween.QUAD_IN_OUT)
  .loop()

const anim2 = new Tween({ x: 37.5 }) //ghost
  .wait(3)
  .to({ x: 17.8 }, 5, Tween.QUAD_IN_OUT)
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
  id: 'QuestTest',
  origin: 'intro',
  views: {
    intro: {
      text: `I wouldn't go down there if I was you.`,
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
  const [view2, setView2] = useState(false)
  const haunteddoneRef = useRef() //door open sound

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

  function hauntedmazedone() {
    const name = world.getAvatar().name
    world.chat(`${name} has completed the haunted maze!`)
    haunteddoneRef.current.play()
    world.teleport(null, 'haunted-foyer')
  }
  function death() {
    setMineActive(true)
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'haunted-maze'), 1000)
    setTimeout(() => setMineActive(false), 1100)
    setTimeout(() => world.chat(`${name} has been eviscerated.`), 1100)
  }

  function ghosted() {
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'haunted-maze'), 500)
    setTimeout(() => world.chat(`A ghost claimed ${name}'s soul.`), 500)
  }

  return (
    <app>
      {
        <group position={[13.8, 2.5, 0]} ref={bodyRef}>
          <model src="DemonWalking.glb" animate={animation} />
          <trigger
            size={[5, 7, 2]}
            position={[0, 2, 1.5]}
            onEnter={() => death()}
          />
        </group>
      }
      {
        <group position={[0, 2.6, -31]} ref={bodyRef2}>
          <model src="ghost.glb" />
          <trigger
            size={[1, 4, 5]}
            position={[0, 1, 0]}
            onEnter={() => ghosted()}
          />
        </group>
      }
      <place label="haunted-foyer" position={[3, 13, -25]} rotationY={-50} />

      <place
        label="haunted-admin"
        position={[-36.5, 18.6, -3.3]}
        rotationY={5}
      />
      <place label="haunted-maze" position={[5, 2.5, -5]} rotationY={5} />
      <place label="turretfrontleft" position={[0, 36.5, 0.5]} rotationY={0} />
      <place label="haunted-coast" position={[-240, 12, -487]} rotationY={0} />

      <Dialog schema={schema} onView={setView} position={[3, 0, 0]}></Dialog>

      <Dialog
        schema={schema2}
        onView={setView2}
        position={[2, 13, -6.5]}
      ></Dialog>

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
      />

      <place label="greenportal1" position={[25.5, 2.5, -13]} rotationY={25} />
      <place label="greenportal2" position={[19.5, 2.5, -27]} rotationY={5} />
      <place
        label="tilecheckpoint398439"
        position={[19.4, 2.5, -36.1]}
        rotationY={-90}
      />

      <trigger //from GP1 to GP2
        position={[23.5, 4.5, -14]}
        size={[1, 4, 3]}
        onEnter={() => world.teleport(null, 'greenportal2')}
      />
      <trigger //from GP2 to GP1
        position={[19.4, 4.5, -23]}
        size={[3, 4, 1]}
        onEnter={() => world.teleport(null, 'greenportal1')}
      />
      <trigger //Maze Complete > BluePortal to Foyer
        position={[47.4, 4.5, -38]}
        size={[2, 4, 1]}
        onEnter={() => hauntedmazedone()}
      />
      <trigger //maze tile safety net
        position={[30, 1, -39]}
        size={[16, 0.1, 11]}
        onEnter={() => world.teleport(null, 'tilecheckpoint398439')}
      />

      <audio //play sound when maze is completed
        src="success.mp4"
        ref={haunteddoneRef}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[3, 13, -25]} //matches haunted-foyer
      ></audio>

      <model src="mazetile_passable.glb" position={[0, 15, 0]} />
      <rigidbody>
        <model
          src="testcastle.glb"
          allColliders="trimesh"
          position={[0, 15, 0]}
        />
        <model
          src="spearman.glb"
          position={[1.5, 12.8, -6]}
          rotation={[0, 210, 0]}
        />
      </rigidbody>
      <model
        src="avatarcapsule001.glb"
        position={[0, 15, 0]}
        onClick={e => {
          engine.open(
            'https://acandar.nyc3.digitaloceanspaces.com/tf_anomaly.vrm',
            true
          )
        }}
      />
      <model
        src="avatarcapsule002.glb"
        position={[0, 15, 0]}
        onClick={e => {
          engine.open(
            'https://acandar.nyc3.digitaloceanspaces.com/lizardsuit.vrm',
            true
          )
        }}
      />
    </app>
  )
}
