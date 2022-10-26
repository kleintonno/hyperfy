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
  id: 'EscapeQuest',
  origin: 'intro',
  views: {
    intro: {
      text: `I've been stuck in here all day. Think you can find a way out?`,
      goto: 'quest1Ask',
    },
    quest1Ask: {
      text: "Get a move on! Just don't hit the red button.",
      origin: 'quest1Ask',
    },
    questComplete: {
      text: 'Congratulations on joining the Order of Acandar Knights. Good luck out there!',
      origin: 'questComplete',
      event: 'complete',
    },
  },
}

export function EscapeQuest(swordPosition, armorPosition, shieldPosition) {
  const [view, setView] = useState(false)
  const [visible, setVisible] = useState(true) //buttons
  const [visible2, setVisible2] = useState(false) //door open
  const [visible3, setVisible3] = useState(true) //door closed
  const [visible4, setVisible4] = useState(false) //lamp lit

  const [mineActive, setMineActive] = useState(true) //red & green buttons
  const [mineActive2, setMineActive2] = useState(false) //blue chair
  const [mineActive3, setMineActive3] = useState(false) //lamp
  const [mineActive4, setMineActive4] = useState(false) //book

  {
    /*
  const world = useWorld()
  const name = world.getAvatar().name

  function chatKnight() {
    world.chat(`Sir ${name} has been knighted!`)
  }
*/
  }
  function doClick() {
    // green button
    setMineActive2(true)
    setMineActive(false)
  }

  function doClick2() {
    //red button
    //lose
  }

  function doClick3() {
    //blue chair
    setMineActive3(true)
    setMineActive2(false)
  }

  function doClick4() {
    //lamp
    setMineActive4(true)
    setMineActive3(false)
    setVisible4(true)
  }
  function doClick5() {
    //book
    setMineActive4(false)
    setVisible2(true)
    setVisible3(false)
  }
  return (
    <>
      <Dialog schema={schema} onView={setView}></Dialog>
      <rigidbody>
        <model src="army62.glb" scale={7} />
        <model src="table.glb" scale={7} />
        <model src="bookshelf.glb" scale={7} />
        <model
          src="greenbook.glb"
          scale={7}
          onClick={mineActive4 ? doClick5 : null}
        />
        <model
          src="bluechair.glb"
          scale={7}
          onClick={mineActive2 ? doClick3 : null}
        />
        <model src="otherchairs.glb" scale={7} />
        <model
          src="lamp.glb"
          scale={7}
          onClick={mineActive3 ? doClick4 : null}
        />

        {visible && (
          <>
            <model
              src="green_button.glb"
              position={[0, 0, 0]}
              scale={7}
              onClick={mineActive ? doClick : null}
            />
            <model
              src="red_button.glb"
              position={[0, 0, 0]}
              scale={7}
              onClick={mineActive ? doClick2 : null}
            />
          </>
        )}
        {visible2 && (
          <model src="door_open.glb" position={[0, 0, 0]} scale={7} />
        )}

        {visible3 && (
          <model src="door_closed.glb" position={[0, 0, 0]} scale={7} />
        )}

        {visible4 && (
          <model src="lamp_lit.glb" position={[0, 0, 0]} scale={7} />
        )}
      </rigidbody>
    </>
  )
}
