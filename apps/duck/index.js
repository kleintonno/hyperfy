import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

const schema = {
  id: 'Quest1',
  origin: 'intro',
  views: {
    intro: {
      text: `So you want to race a duck?`,
      options: [
        { text: 'Yes, of course!', goto: 'intro2' },
        { text: "No, I'm lame" },
      ],
    },
    intro2: {
      text: 'Go ahead and pick one. If you want to release it, click the red button.',
    },
  },
}

{
  /*
  Need to ensure user doesn't select multiple ducks. 
    Simply disabling all the ducks when the user first clicks one causes issues with returning.
    When returning, I can't enable all the ducks for reselection, in case someone else has already selected one of the other ducks.

  Need to sync selected state across users.
  */
}

export default function World() {
  const engine = useWorld()
  const world = useWorld()
  const [view, setView] = useState(false)
  //const [view2, setView2] = useSyncState(false)

  const [mineActive1, setMineActive1] = useState(true) // Enable/Disable On Click
  const [mineActive2, setMineActive2] = useState(true)
  const [mineActive3, setMineActive3] = useState(true)

  const [hasDuck1, setHasDuck1] = useState(false)
  const [hasDuck2, setHasDuck2] = useState(false)
  const [hasDuck3, setHasDuck3] = useState(false)

  const [visible1, setVisible1] = useState(false) // Enable/Disable Deslect Button
  const [visible2, setVisible2] = useState(false)
  const [visible3, setVisible3] = useState(false)

  const [color, dispatch] = useSyncState(state => state.color)

  function doClick1() {
    const name = world.getAvatar().name
    setHasDuck1(true) //User selects duck
    setMineActive1(false) //Disable another user from selecting duck
    world.chat(`${name} selected duck one!`)
    setVisible1(true) // Display button to deselect duck
  }
  function doClick2() {
    const name = world.getAvatar().name
    setHasDuck2(true) //User selects duck
    setMineActive2(false) //Disable another user from selecting duck
    world.chat(`${name} selected duck two!`)
    setVisible2(true) // Display button to deselect duck
  }
  function doClick3() {
    const name = world.getAvatar().name
    setHasDuck3(true) //User selects duck
    setMineActive3(false) //Disable another user from selecting duck
    world.chat(`${name} selected duck three!`)
    setVisible3(true) // Display button to deselect duck
  }
  function returnDuck1() {
    const name = world.getAvatar().name
    setHasDuck1(false) // Deselect duck
    setMineActive1(true) // Enable duck for someone else to select
    world.chat(`${name} returned duck one!`)
    setVisible1(false) // Hide button to deselect duck
  }
  function returnDuck2() {
    const name = world.getAvatar().name
    setHasDuck2(false) // Deselect duck
    setMineActive2(true) // Enable duck for someone else to select
    world.chat(`${name} returned duck two!`)
    setVisible2(false) // Hide button to deselect duck
  }
  function returnDuck3() {
    const name = world.getAvatar().name
    setHasDuck3(false) // Deselect duck
    setMineActive3(true) // Enable duck for someone else to select
    world.chat(`${name} returned duck three!`)
    setVisible3(false) // Hide button to deselect duck
  }

  return (
    <app>
      <box
        color={color}
        position={[2, 0, 2.5]}
        onClick={() => dispatch('toggle')}
      />

      <place label="demon-death" position={[0, 0, 2.5]} rotationY={30} />

      <Dialog schema={schema} onView={setView}></Dialog>

      <model
        src="duck.glb" //Duck1
        position={[3, 0, -6]}
        scale={0.25}
        onClick={mineActive1 ? doClick1 : null}
      />
      {visible1 && (
        <>
          <box
            size={[0.25, 0.25, 0.25]}
            color="red"
            position={[2, 0, -6]}
            onClick={returnDuck1}
          />
        </>
      )}

      <model
        src="duck.glb" //Duck2
        position={[3, 0, -7]}
        scale={0.25}
        onClick={mineActive2 ? doClick2 : null}
      />
      {visible2 && (
        <>
          <box
            size={[0.25, 0.25, 0.25]}
            color="red"
            position={[2, 0, -7]}
            onClick={returnDuck2}
          />
        </>
      )}

      <model
        src="duck.glb" //Duck3
        position={[3, 0, -8]}
        scale={0.25}
        onClick={mineActive3 ? doClick3 : null}
      />
      {visible3 && (
        <>
          <box
            size={[0.25, 0.25, 0.25]}
            color="red"
            position={[2, 0, -8]}
            onClick={returnDuck3}
          />
        </>
      )}

      <rigidbody>
        <model src="spearman.glb" />
      </rigidbody>
    </app>
  )
}
const initialState = {
  color: 'blue',
}
export function getStore(state = initialState) {
  return {
    state,
    actions: {
      toggle(state) {
        state.color = state.color === 'blue' ? 'red' : 'blue'
      },
    },
  }
}
