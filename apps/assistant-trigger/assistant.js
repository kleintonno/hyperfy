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
        { text: 'What is Acandar?', goto: 'menuAcandar' },
        { text: 'Play some games', goto: 'menu2Games' },
        { text: 'Patrol the wall', goto: 'menu2Walls' },
        { text: 'Explore', goto: 'menuExplore' },
        { text: 'Dance with me', goto: 'menuDance' },
      ],
    },
    menuAcandar: {
      text: 'Acandar is a refuge from the destruction of our homeworld. Brave knights and mighty wizards are needed to rebuild our civilization.',
      origin: 'intro',
    },
    menu2Games: {
      text: 'Where would you like to go?',
      origin: 'intro',
      options: [
        { text: 'Platforms', event: 'platforms' },
        { text: 'Escape Room', event: 'escape' },
        { text: 'Maze', event: 'maze' },
        { text: 'Knight Quest' },
        { text: 'Back', goto: 'menu1' },
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
        { text: 'Back', goto: 'menu1' },
      ],
    },
    menuExplore: {
      text: 'Where would you like to go?',
      options: [
        { text: 'Outer Wall', event: 'teleportOW' },
        { text: "Admiral's Flagship", event: 'teleportBoat' },
        { text: 'Lumber Mill', event: 'teleportMill' },
        { text: 'Back', goto: 'menu1' },
      ],
    },
    menuDance: {
      text: "Let's see what you got!",
      options: [{ text: 'Back', goto: 'menu1' }],
    },
  },
}

export function AssistantQuest(swordPosition, armorPosition, shieldPosition) {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)
  const world = useWorld()

  // Erika is sad until she gets her teddy.
  let animation = mineActive ? 'Idle' : 'Greeting'
  // If you're talking to her:-
  if (view) {
    if (view === 'menu2Games') {
      animation = 'Excited'
    } else if (view === 'menu2Walls') {
      animation = 'FistPump'
    } else if (view === 'menuDance') {
      animation = 'BellyDance'
    } else if (view === 'menuExplore') {
      animation = 'FistPump'
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
          if (event === 'teleportW1') {
            world.teleport(null, 'wallfrontright')
          }

          if (event === 'teleportW2') {
            world.teleport(null, 'wallfrontleft')
          }

          if (event === 'teleportW3') {
            world.teleport(null, 'wallbackleft')
          }

          if (event === 'teleportW4') {
            world.teleport(null, 'wallbackright')
          }
          if (event === 'teleportOW') {
            world.teleport(null, 'outerwall')
          }
          if (event === 'platforms') {
            world.teleport(null, 'maze-start')
          }

          if (event === 'escape') {
            world.teleport(null, 'escaperoom')
          }

          if (event === 'maze') {
            world.teleport(null, 'maze_quest')
          }

          if (event === 'teleportBoat') {
            world.teleport(null, 'boat')
          }

          if (event === 'teleportMill') {
            world.teleport(null, 'mill')
          }
        }}
      ></Dialog>
      <model src="assistant.glb" animate={animation} />
    </>
  )
}
