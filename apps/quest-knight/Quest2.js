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
      text: 'Last but not least, you need a shield. There might be a spare in the throne room.',
      origin: 'quest3Ask',
      options: [
        { text: 'Sir, yes Sir!', goto: 'quest3Accept', event: 'mine3' },
        { text: 'Oh look at the time...', goto: 'quest3Reject' },
      ],
    },
    quest3Reject: {
      text: "*Grumble*\n\nGet outta here mama's boy",
      origin: 'quest3Ask',
    },
    quest3Accept: {
      text: "I'll be here. Waiting.",
      origin: 'quest3Active',
    },
    quest3Active: {
      text: 'Found a solid shield?',
      options: [
        { text: 'Found one!', require: 'shield', goto: 'questComplete' },
        { text: 'Where am I?', goto: 'quest3NotYet' },
      ],
    },
    quest3NotYet: {
      text: 'Move your ass, kid!',
    },
    questComplete: {
      text: "Looks like you're ready to go. Good luck out there!",
      origin: 'questComplete',
      event: 'complete',
    },
  },
}

export function Quest2(swordPosition, armorPosition, shieldPosition) {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mineActive2, setMineActive2] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [mineActive3, setMineActive3] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const [hasSword, setHasSword] = useState(false)
  const [hasArmor, setHasArmor] = useState(false)
  const [hasShield, setHasShield] = useState(false)

  function doClick() {
    setHasSword(true)
    setVisible(false)
  }

  function doClick2() {
    setHasArmor(true)
    setVisible2(false)
  }

  function doClick3() {
    setHasShield(true)
    setVisible3(false)
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
            setVisible3(true)
          }
          if (event === 'mine2') {
            setMineActive2(true)
          }
          if (event === 'mine3') {
            setMineActive3(true)
          }
        }}
        onRequire={name => {
          if (name === 'sword') return hasSword
          if (name === 'armor') return hasArmor
          if (name === 'shield') return hasShield
        }}
      ></Dialog>

      <model src="army79.glb" scale={7} />
      <model src="armor_accessories.glb" scale={7} />
      <model src="swordrack.glb" scale={7} />

      {visible && (
        <>
          <model
            src="sword.glb"
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={7}
            onClick={mineActive ? doClick : null}
          />
        </>
      )}
      {visible2 && (
        <>
          <model
            src="armor.glb"
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={7}
            onClick={mineActive2 ? doClick2 : null}
          />
        </>
      )}
      {visible3 && (
        <>
          <model
            src="shield.glb"
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={7}
            onClick={mineActive3 ? doClick3 : null}
          />
        </>
      )}
    </>
  )
}
