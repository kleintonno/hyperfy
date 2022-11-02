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
      text: `Welcome to Acandar. My name is Alice. How may I help you?`,
      options: [
        { text: 'What is Acandar?', goto: 'menuAcandar' },
        { text: 'Quests & Challenges', goto: 'menu2Games' },
        { text: 'Explore Acandar', goto: 'menuExplore' },
        { text: 'Care to dance?', goto: 'menuDance' },
        { text: 'Good bye' },
      ],
    },
    menuAcandar: {
      text: 'Acandar is a refuge from the destruction of our homeworld. Brave knights and mighty wizards are needed to rebuild our civilization.',
      options: [
        { text: 'How can I help? (TBA)' },
        { text: 'Are those portals? (TBA)' },
        { text: 'Back', goto: 'intro' },
        { text: 'Good bye' },
      ],
    },
    menu2Games: {
      text: 'To separate the worthy from the chaff, we have designed challenges of valor and wit.',
      origin: 'intro',
      options: [
        { text: 'Platforms/Patterns', event: 'platforms' },
        { text: 'Escape Room', event: 'escape' },
        { text: 'Maze', event: 'maze' },
        { text: 'Knight Quest', goto: 'menuKnight' },
        { text: 'Back', goto: 'intro' },
        { text: 'Good bye' },
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
        { text: 'Back', goto: 'intro' },
        { text: 'Good bye' },
      ],
    },
    menuExplore: {
      text: 'Where would you like to go?',
      options: [
        { text: 'Castle wall', goto: 'menu2Walls' },
        { text: 'Outer wall', event: 'teleportOW' },
        { text: "Admiral's flagship", event: 'teleportBoat' },
        { text: 'Lumber Mill', event: 'teleportMill' },
        { text: 'Back', goto: 'intro' },
        { text: 'Good bye' },
      ],
    },
    menuDance: {
      text: "Let's see what you got!",
      options: [{ text: 'Back', goto: 'intro' }, { text: 'Good bye' }],
    },
    menuKnight: {
      text: 'Talk to Captain Sterling by the stairwell.',
      options: [{ text: 'Back', goto: 'intro' }, { text: 'Good bye' }],
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
