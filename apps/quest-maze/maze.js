import React, { useState } from 'react'
import { useWorld } from 'hyperfy'
import { Dialog } from './Dialog'

/**
 *
 * The dialog "schema" is a simple format that lets you write all of the dialog flow.
 * A "view" is an individual dialog box with text. Each view has a number of other fields
 * that can be used to create side effects like changing the npc animation, making blockchain
 * contract calls, http requests etc.
 *
 * See `Dialog.js` for full schema overview
 *
 */
const schema = {
  id: 'mazedialog',
  origin: 'intro',
  views: {
    intro: {
      text: `Think you can find your way through the maze?`,
      goto: 'intro2',
    },
    intro2: {
      text: "Appearances can be deceiving. Good luck! You'll need it.",
      origin: 'intro2',
      event: 'opendoor1',
    },
    finale: {
      text: 'tbd',
      origin: 'end',
    },
  },
}

export function MazeQuest() {
  const [view, setView] = useState(false)
  const [visible, setVisible] = useState(true) //door1
  const [visible2, setVisible2] = useState(true) //door2
  const [visible3, setVisible3] = useState(true) //door3
  const [visible4, setVisible4] = useState(true) //door4
  const world = useWorld()

  function chatOpen() {
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
  }
  function chatClose() {
    const name = world.getAvatar().name
    world.chat(`${name} has closed a door!`)
  }
  function chatWinner() {
    const name = world.getAvatar().name
    world.chat(`${name} has completed the maze!`)
  }

  //open1 handled through npc1 quest event

  function open2() {
    //npc2
    setVisible2(false)
    setVisible(true)
    chatOpen()
  }

  function open3() {
    //npc5
    setVisible3(false)
    chatOpen()
  }

  function open4() {
    //npc3
    setVisible4(false)
    chatOpen()
  }

  function close3() {
    //npc4
    setVisible3(true)
    chatClose()
  }

  function close4() {
    //npc6
    setVisible4(true)
    chatClose()
  }
  function end() {
    chatWinner()
  }
  return (
    <>
      <Dialog
        schema={schema}
        onView={setView}
        onEvent={event => {
          if (event === 'opendoor1') {
            setVisible(false)
          }
          if (event === 'complete') {
            chatKnight()
          }
        }}
      ></Dialog>

      <rigidbody>
        <model src="maze.glb" scale={1} allColliders="trimesh" />
        <model src="npc1.glb" scale={1} />
        <model src="npc2.glb" scale={1} onClick={open2} />
        <model src="npc3.glb" scale={1} onClick={open4} />
        <model src="npc4.glb" scale={1} onClick={close3} />
        <model src="npc5.glb" scale={1} onClick={open3} />
        <model src="npc6.glb" scale={1} onClick={close4} />
        <model src="end.glb" scale={1} onClick={end} />

        {visible && (
          <>
            <model
              src="door1.glb"
              allColliders="trimesh"
              position={[0, 0, 0]}
              scale={1}
            />
          </>
        )}
        {visible2 && (
          <>
            <model
              src="door2.glb"
              allColliders="trimesh"
              position={[0, 0, 0]}
              scale={1}
            />
          </>
        )}
        {visible3 && (
          <>
            <model
              src="door3.glb"
              allColliders="trimesh"
              position={[0, 0, 0]}
              scale={1}
            />
          </>
        )}
        {visible4 && (
          <>
            <model
              src="door4.glb"
              allColliders="trimesh"
              position={[0, 0, 0]}
              scale={1}
            />
          </>
        )}
      </rigidbody>
    </>
  )
}
