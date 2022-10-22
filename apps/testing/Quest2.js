import React, { useState } from 'react'

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
  id: 'Quest2',
  origin: 'intro',
  views: {
    intro: {
      text: "So you want to become a knight?",
      goto: 'quest1Ask',
  },
  quest1Ask: {
    text: 'First you will need a sword. Grab one off the rack.',
    origin: 'quest1Ask',
    options: [
      { text: "I'll get right on it!", goto: 'introAccept', event: 'mine'},
      { text: "Maybe later", goto: 'introReject' },
    ],
  },
  
  introReject: {
    text: "*Grumble*\n\nKids these days...",
    origin: 'intro',
  },
  introAccept: {
    text: "Check back with me when you have it.",
    origin: 'quest1Active',
  },
  quest1Active: {
    text: 'Got your sword?',
    options: [
      { text: 'Yep, got it!', require: 'sword', goto: 'questAsk2',
    },
      { text: 'Sorry, not yet', goto: 'quest1NotYet' },
    ],
  },
  quest1NotYet: {
    text: "We don't have all day buttercup!",
  },

  }
}

export function Quest2() {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)
  const [mineActive2, setMineActive2] = useState(false)
  const [visible, setVisible] = useState(false)

  function doClick() {
    setMineActive(true)

  }

  return (
    <>
      <Dialog
        schema={schema}
        onView={setView}
        onEvent={event => {
          if (event === 'mine') {
            setVisible(true)
          }
        }}
      ></Dialog>

      <model src="army79.glb"  />
      {visible && (
        <>
      <model src="bookshelf.glb" position={[10, 0, -5]} />
      <model src="swordrack.glb" position={[10,0,10]} rotation={[0,0,0]} onClick={mineActive ? doClick : null}/>
      <model src="sword.glb" position={[10,0,10]} rotation={[0,0,0]} />
      <model src="armor.glb" position={[10,0,5]} rotation={[0,0,0]} scale={0.1}/>


</>
      )}

    </>
  )
  
}
