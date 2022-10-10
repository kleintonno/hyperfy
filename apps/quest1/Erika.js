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
  id: 'Erika',
  origin: 'intro',
  views: {
    intro: {
      text: "So you want to become a knight?",
      goto: 'questAsk',
    },
    questAsk: {
      text: 'First you will need some armor. There are spare breastplates at the fortress guarding the mountain pass.',
      origin: 'questAsk',
      options: [
        { text: "I'll get right on it!", goto: 'questAccept' },
        { text: 'Maybe later', goto: 'questReject' },
      ],
    },
    questReject: {
      text: '*Grumble*\n\nKids these days...',
    },
    questAccept: {
      text: 'Check back with me when you have it.',
      origin: 'questActive',
    },
    questActive: {
      text: 'Welcome back. Any luck finding my armor bear?',
      options: [
        { text: 'Yep, here you go!', require: 'armor', goto: 'questComplete' },
        { text: 'Sorry, not yet', goto: 'questNotYet' },
      ],
    },
    questNotYet: {
      text: 'I really hope you can find him for me!',
    },
    questComplete: {
      text: 'Oh for realsies!?!? You found him! Thank you so much sir!',
      origin: 'loved',
      event: 'complete',
    },
    loved: {
      text: "I don't know what I would have done if you didn't find my armor for me.",
    },
  },
}

export function Erika({ position, armorPosition, swordPosition }) {
  const [view, setView] = useState(false)
  const [hasArmor, setHasArmor] = useState(false)
  const [givenArmor, setGivenArmor] = useState(false)
  const [view2, setView2] = useState(false)
  const [hasSword, setHasSword] = useState(false)
  const [givenSword, setGivenSword] = useState(false)

  // Erika is sad until she gets her armor.
  let animation = givenArmor ? 'Happy' : 'Sad'
  // If you're talking to her:-
  if (view) {
    if (view === 'questComplete') {
      // She's excited when you give her the armor!
      //animation = 'Excited'
    } else {
      // Otherwise she just talks to you
      //animation = 'Talk'
    }
  }

  return (
    <>
            <model src="questgiver.glb"  />

      <Dialog
        position={position}
        schema={schema}
        onRequire={name => {
          if (name === 'armor') return hasArmor
        }}
        onView={setView}
        onEvent={(event, setView) => {
          if (event === 'complete') {
            setGivenArmor(true)
          }
          // If you wanted to you could run async stuff like checking a wallet
          // here in response to an event, and then call setView(String) to continue
          // the conversation.
        }}
      >
      </Dialog>
      {!hasArmor && (
        <model
          src="armor.glb"
          position={armorPosition}
          onClick={() => setHasArmor(true)}
        />
      )}
      <Dialog
        position={position}
        schema={schema}
        onRequire={name => {
          if (name === 'sword') return hasSword
        }}
        onView={setView2}
        onEvent={(event, setView2) => {
          if (event === 'complete') {
            setGivenSword(true)
          }
          // If you wanted to you could run async stuff like checking a wallet
          // here in response to an event, and then call setView(String) to continue
          // the conversation.
        }}
      >
      </Dialog>
      {!hasSword && (
        <model
          src="sword.glb"
          position={swordPosition}
          onClick={() => setHasSword(true)}
        />
      )}

    </>
  )
  
}
