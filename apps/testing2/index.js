import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

import { Tween } from './Tween'
const anim = new Tween({ z: -8.5 })
  .to({ z: -20 }, 5, Tween.QUAD_IN_OUT)
  .to({ z: -8.5 }, 5, Tween.QUAD_IN_OUT)
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
  /*Entry Guard
   */
}

const schema = {
  id: 'Quest1',
  origin: 'intro',
  views: {
    intro: {
      text: `Hey Stranger, the castle is haunted. Haven't you heard?`,
      options: [
        { text: 'I need to enter', goto: 'intro2' },
        { text: 'Good bye' },
      ],
    },
    intro2: {
      text: 'Are you crazy? Well shut the door behind you.',
      event: 'opendoor1',
    },
  },
}

export default function World() {
  const bodyRef = useRef()
  const bodyRef2 = useRef()
  const bodyRef3 = useRef()
  const bodyRef4 = useRef()
  const bodyRef5 = useRef()
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

  let animation = mineActive ? 'Attack' : 'Walking'
  let animation2 = mineActive ? 'Attack' : 'Idle'
  let animation3 = mineActive ? 'Attack' : 'Idle'

  function death() {
    setMineActive(true)
    const name = world.getAvatar().name
    setTimeout(() => world.teleport(null, 'demon-death'), 1000)
    setTimeout(() => setMineActive(false), 1100)
    setTimeout(() => world.chat(`${name} has been eviscerated.`), 1100)
  }

  return (
    <app>
      {
        <group position={[-9, 0, -2]} ref={bodyRef}>
          <model src="DemonWalking.glb" animate={animation} />
          <trigger
            size={[2, 4, 2]}
            position={[0, 1, 1.5]}
            onEnter={() => death()}
          />
        </group>
      }

      {
        <group position={[10, 0, 10]}>
          <model src="DemonIdle.glb" animate={animation2} />
          <trigger
            size={[2, 4, 2]}
            position={[0, 1, 1.5]}
            onEnter={() => death()}
          />
        </group>
      }

      <place label="demon-death" position={[0, 0, 2.5]} rotationY={30} />

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
        position={[-7.5, 1, -5]}
        onEnter={() => death()}
        debug
      />

      <rigidbody>
        <model src="hauntedcastle.glb" allColliders="trimesh" />
      </rigidbody>
    </app>
  )
}
