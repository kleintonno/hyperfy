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
      text: 'First you will need a sword. Grab one off the rack.',
      origin: 'questAsk',
      options: [
        { text: "I'll get right on it!", goto: 'questAccept' },
        { text: 'Maybe later', goto: 'questReject' },
      ],
    },
    questReject: {
      text: '*Grumble*\n\nKids these days...',
      origin: 'intro',
    },
    questAccept: {
      text: 'Check back with me when you have it.',
      origin: 'questActive',
    },
    questActive: {
      text: 'Got your sword?',
      options: [
        { text: 'Yep, got it!', require: 'sword', goto: 'questAsk2',
      },
        { text: 'Sorry, not yet', goto: 'questNotYet' },
      ],
    },
    questNotYet: {
      text: "We don't have all day buttercup!",
    },
    questAsk2: {
      text: 'Now you need some armor. There are spare breastplates at the fortress guarding the mountain pass.',
      origin: 'questAsk2',
      options: [
        { text: "I'm on it, Captain!", goto: 'questAccept2' },
        { text: 'Some other time...', goto: 'questReject2' },
      ],
    },
    questReject2: {
      text: '*Grumble*\n\nPaperhand...',
    },
    questAccept2: {
      text: 'You know where to find me.',
      origin: 'questActive2',
    },
    questActive2: {
      text: 'Got your armor yet?',
      options: [
        { text: 'Yes, Sir!', require: 'armor', goto: 'questComplete' },
        { text: 'Sorry, not yet', goto: 'questNotYet' },
      ],
    },
    questComplete: {
      text: 'Ready for battle? Maybe a shield first?',
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
          scale={1}
        />
      )}
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
