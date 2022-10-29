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
  id: 'Quest2',
  origin: 'intro',
  views: {
    intro: {
      text: `Welcome to Acandar. How may I help you?`,
      goto: 'menu1',
    },
    menu1: {
      text: 'Would you like to...',
      origin: 'menu1',
      options: [
        { text: 'Explore mini games.', goto: 'menu2Games' },
        { text: 'Patrol the curtain wall.', goto: 'menu2Walls' },
      ],
    },
    menu2Games: {
      text: 'Where would you like to go?',
      origin: 'intro',
      options: [
        { text: 'Platforms', event: 'platforms' },
        { text: 'Escape Room', event: 'escape' },
        { text: 'Maze', event: 'maze' },
        { text: 'Knight Quest' },
      ],
    },
    menu2Walls: {
      text: 'Where would you like to start?',
      origin: 'intro',
      options: [
        { text: 'Front Right', event: 'teleportW1' },
        { text: 'Front Left', event: 'teleportW2' },
        { text: 'Back Left', event: 'teleportW3' },
        { text: 'Back Right', event: 'teleportW4' },
      ],
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
      text: 'Congratulations on joining the Order of Acandar Knights. Good luck out there!',
      origin: 'finale',
      event: 'complete',
    },
    finale: {
      text: 'Wen helmet?',
    },
  },
}

export function AssistantQuest(swordPosition, armorPosition, shieldPosition) {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)
  const [visible, setVisible] = useState(false)
  const [mineActive2, setMineActive2] = useState(false)
  const [visible2, setVisible2] = useState(false)
  const [mineActive3, setMineActive3] = useState(false)
  const [visible3, setVisible3] = useState(false)
  const world = useWorld()

  function chatKnight() {
    const name = world.getAvatar().name
    world.chat(`Sir ${name} has been knighted!`)
  }

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

  // Erika is sad until she gets her teddy.
  let animation = mineActive ? 'Idle' : 'Greeting'
  // If you're talking to her:-
  if (view) {
    if (view === 'menu2Games') {
      animation = 'FistPump'
    } else if (view === 'menu2Walls') {
      animation = 'BlowKiss'
    } else {
      animation = 'Idle'
    }
  }

  return (
    <>
      <Dialog
        schema={schema}
        onView={setView}
        onEvent={event => {
          if (event === 'maze') {
            world.teleport(null, 'maze_quest')
          }
        }}
      ></Dialog>
      <rigidbody>
        <model src="assistant.glb" scale={7} animate={animation} />
      </rigidbody>
    </>
  )
}
