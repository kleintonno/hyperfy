import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'
import { Dialog } from './Dialog'

const schema = {
  id: 'phettaNPC',
  origin: 'intro',
  views: {
    intro: {
      text: `Welcome to the Phettaverse. How may I help you?`,
      options: [
        { text: "What's the Phettaverse?", goto: 'whatisPhetta1' },
        { text: "I'd like to explore.", goto: 'menuExplore' },
        { text: 'Good bye.' },
      ],
    },
    whatisPhetta1: {
      text: 'The Phettaverse provides me with a unique platform for expressing and dissembling my innermost thoughts.',
      goto: 'whatisPhetta2',
    },
    whatisPhetta2: {
      text: "I'm planning to use aspects of my upbringing and maturity to create an intruiging sci-fi story that anybody can read.",
      goto: 'whatisPhetta3',
    },
    whatisPhetta3: {
      text: 'The Phettaverse is vast and began on April 5, 2021, with the publication of the first movie depiciting the destruction of the ancient metropolis.',
      options: [{ text: 'Back', goto: 'intro' }, { text: 'Good bye' }],
    },
    menuExplore: {
      text: 'Where would you like to go?',
      options: [
        { text: '7Rabbits', event: 'teleport7Rabbits' },
        { text: 'Back', goto: 'intro' },
        { text: 'Good bye' },
      ],
    },
    menuKnight: {
      text: 'Talk to Captain Sterling by the stairwell.',
      options: [{ text: 'Back', goto: 'intro' }, { text: 'Good bye' }],
    },
  },
}

export default function World() {
  const engine = useWorld()
  const world = useWorld()
  const [animState1, setanimState1] = useState(false)
  const [view, setView] = useState(false)

  let animation = animState1 ? 'Distress' : 'Idle'
  if (view) {
    if (view === 'menuExplore') {
      animation = 'Distress'
    } else {
      animation = 'Idle'
    }
  }

  return (
    <app>
      <place label="7Rabbits" position={[36.4, 2.6, -26.3]} />
      <Dialog
        schema={schema}
        onView={setView}
        position={[0, 0, 0]}
        onEvent={event => {
          if (event === 'teleport7Rabbits') {
            world.teleport(null, '7Rabbits')
          }
        }}
      ></Dialog>

      <model src="tvmanwelcomenpc.glb" animate={animation} scale={1.5} />
    </app>
  )
}
