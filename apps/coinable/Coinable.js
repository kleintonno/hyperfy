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
      text: 'Then check out the Coinable demo on the 2nd floor!',
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
      text: 'Feel free to jump in discord and ask futher questions! Minting soon...',
      origin: 'loved',
      event: 'complete'
    },
    loved: {
      text: "I hope you enjoyed the Coinable demo.",
    },
  },
}

export function Coinable({ position }) {
  const [view, setView] = useState(false)

  return (
    <>
            <model src="questgiver.glb"  />

      <Dialog
        position={position}
        schema={schema}

        onView={setView}

      >
      </Dialog>

    </>
  )
  
}
