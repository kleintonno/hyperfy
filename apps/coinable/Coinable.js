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
  id: 'Coinable',
  origin: 'intro',
  views: {
    intro: {
      text: "Interested in accepting crypto payments for your online store?",
      goto: 'questAsk',
    },
    questAsk: {
      text: 'Check out the demo at the Coinable house. You can hop over with the portal.',
      origin: 'questAsk',
      options: [
        { text: "Sounds good!", goto: 'questAccept' },
        { text: 'Maybe later...', goto: 'questReject' },
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

export function Coinable({ position, armorPosition, swordPosition }) {
  const [view, setView] = useState(false)
  const [hasArmor, setHasArmor] = useState(false)
  const [givenArmor, setGivenArmor] = useState(false)

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
    </>
  )
  
}
