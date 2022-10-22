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
      text: 'So you want to become a knight?',
      goto: 'quest1Ask',
    },
    quest1Ask: {
      text: 'First you will need a sword. Grab one off the rack.',
      origin: 'quest1Ask',
      options: [
        { text: "I'll get right on it!", goto: 'quest1Accept', event: 'mine' },
        { text: 'Maybe later', goto: 'quest1Reject' },
      ],
    },
    quest1Reject: {
      text: '*Grumble*\n\nKids these days...',
      origin: 'quest1Ask',
    },
    quest1Accept: {
      text: 'Check back with me when you have it.',
      origin: 'quest1Active',
    },
    quest1Active: {
      text: 'Got your sword?',
      options: [
        { text: 'Yep, got it!', require: 'sword', goto: 'quest2Ask' },
        { text: 'Sorry, not yet', goto: 'quest1NotYet' },
      ],
    },
    quest1NotYet: {
      text: "We don't have all day buttercup!",
    },
    quest2Ask: {
      event: 'quest1Complete',
      text: "Well done! Next, you'll need armor. We have spares at the outer wall armory.",
      origin: 'quest2Ask',
      options: [
        { text: 'Right away, Captain!', goto: 'quest2Accept', event: 'mine2' },
        { text: 'Some other time...', goto: 'quest2Reject' },
      ],
    },
    quest2Reject: {
      text: '*Grumble*\n\nProbably a paperhand anyways...',
      origin: 'quest2Ask',
    },
    quest2Accept: {
      text: 'You know where to find me.',
      origin: 'quest2Active',
    },
    quest2Active: {
      text: 'Suited up?',
      options: [
        { text: 'Yes, Sir!', require: 'armor', goto: 'quest3Ask' },
        { text: 'Still looking...', goto: 'quest2NotYet' },
      ],
    },
    quest2NotYet: {
      text: 'Get a move on!',
    },
    quest3Ask: {
      text: 'tbd.',
      origin: 'quest3Ask',
      options: [
        { text: "I'll get right on it!", goto: 'quest1Accept', event: 'mine' },
        { text: 'Maybe later', goto: 'quest1Reject' },
      ],
    },
  },
}

export function Quest2(swordPosition) {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mineActive2, setMineActive2] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [hasSword, setHasSword] = useState(false)
  const [hasArmor, setHasArmor] = useState(false)

  function doClick() {
    setHasSword(true)
    setVisible(false)
  }

  function doClick2() {
    setHasArmor(true)
    setVisible2(false)
  }

  return (
    <>
      <Dialog
        schema={schema}
        onView={setView}
        onEvent={event => {
          if (event === 'mine') {
            setVisible(true)
            setMineActive(true)
            setVisible2(true)
          }
          if (event === 'mine2') {
            setMineActive2(true)
          }
        }}
        onRequire={name => {
          if (name === 'sword') return hasSword
          if (name === 'armor') return hasArmor
        }}
      ></Dialog>

      <model src="army79.glb" rotation={[0, -90, 0]} />
      <model src="bookshelf.glb" position={[10, 0, -5]} />
      <model src="swordrack.glb" position={[10, 0, 10]} rotation={[0, 0, 0]} />

      {visible && (
        <>
          <model
            src="sword.glb"
            position={[10, 0, 10]}
            rotation={[0, 0, 0]}
            onClick={mineActive ? doClick : null}
          />
        </>
      )}
      {visible2 && (
        <>
          <model
            src="armor.glb"
            position={[10, 0, 5]}
            rotation={[0, 0, 0]}
            scale={0.1}
            onClick={mineActive2 ? doClick2 : null}
          />
        </>
      )}
    </>
  )
}
