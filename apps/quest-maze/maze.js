import React, { useState, useRef } from 'react'
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
      text: `Think you can find your way through the maze? Click here to start.`,
      goto: 'intro2',
    },
    intro2: {
      text: "Appearances can be deceiving. Good luck! You'll need it.",
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
  const [visible1, setVisible1] = useState(true) //door1
  const [visible2, setVisible2] = useState(true) //door2
  const [visible3, setVisible3] = useState(true) //door3
  const [visible4, setVisible4] = useState(true) //door4
  const [visible5, setVisible5] = useState(true) //door5
  const world = useWorld()
  const open1Ref = useRef() //door open sound
  const open2Ref = useRef() //door open sound
  const open3Ref = useRef() //door open sound
  const open4Ref = useRef() //door open sound
  const open5Ref = useRef() //door open sound
  const close1Ref = useRef() //door close sound
  const close2Ref = useRef() //door close sound

  function open1() {
    setVisible1(false)
    setVisible2(true)
    setVisible3(true)
    setVisible4(true)
    setVisible5(true)
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
    open1Ref.current.play()
  }
  function open2() {
    setVisible2(false)
    setVisible1(true)
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
    open2Ref.current.play()
  }
  function open3() {
    setVisible3(false)
    setVisible2(true)
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
    open3Ref.current.play()
  }
  function open4() {
    setVisible4(false)
    setVisible2(true)
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
    open4Ref.current.play()
  }
  function open5() {
    setVisible5(false)
    setVisible4(true)
    const name = world.getAvatar().name
    world.chat(`${name} has opened a door!`)
    open5Ref.current.play()
  }
  function close1() {
    setVisible3(true)
    const name = world.getAvatar().name
    world.chat(`${name} has closed a door!`)
    close1Ref.current.play()
  }
  function close2() {
    setVisible4(true)
    const name = world.getAvatar().name
    world.chat(`${name} has closed a door!`)
    close2Ref.current.play()
  }
  function confirmWinner() {
    const name = world.getAvatar().name
    world.chat(`${name} has completed the maze!`)
  }

  return (
    <>
      <Dialog
        schema={schema}
        onView={setView}
        onEvent={event => {
          if (event === 'opendoor1') {
            open1()
          }
        }}
      ></Dialog>

      <audio
        src="open.mp3"
        ref={open1Ref}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[0, 0, 0]}
      ></audio>

      <audio
        src="open.mp3"
        ref={open2Ref}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[-15, 0, 7.7]}
      ></audio>

      <audio
        src="open.mp3"
        ref={open3Ref}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[-13, 0, -7]}
      ></audio>

      <audio
        src="open.mp3"
        ref={open4Ref}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[-18.5, 0, -14]}
      ></audio>

      <audio
        src="open.mp3"
        ref={open5Ref}
        autoplay={false}
        volume={2}
        spatial={true}
        position={[-20, 0, -14.5]}
      ></audio>

      <audio
        src="close.mp3"
        ref={close1Ref}
        autoplay={false}
        volume={3}
        spatial={true}
        position={[-32.4, 0, -4.4]}
      ></audio>

      <audio
        src="close.mp3"
        ref={close2Ref}
        autoplay={false}
        volume={3}
        spatial={true}
        position={[-1, 0, -27.5]}
      ></audio>

      <rigidbody>
        <model src="maze.glb" scale={1} allColliders="trimesh" />
        <model src="npc1.glb" scale={1} />
        <model src="npc2.glb" scale={1} onClick={open2} />
        <model src="npc3.glb" scale={1} onClick={open4} />
        <model src="npc4.glb" scale={1} onClick={close1} />
        <model src="npc5.glb" scale={1} onClick={open3} />
        <model src="npc6.glb" scale={1} onClick={close2} />
        <model src="npc7.glb" scale={1} onClick={open5} />
        <model src="end.glb" scale={1} onClick={confirmWinner} />

        {visible1 && (
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
        {visible5 && (
          <>
            <model
              src="door5.glb"
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
