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
    three: {
    text: 'Are you free to help with some more stuff? \nWe can use all the help we can get.',
    options: [
      { text: 'Yes', event: 'mine', goto: 'four', origin: 'four' },
      { text: 'No' },
    ],
  },

  }
}

export function Quest2({position}) {
  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)

  return (
    <>
      <Dialog
        position={position}
        schema={dialog}
        onView={setView}
        onEvent={event => {
          if (event === 'mine') {
            setMineActive(true)
          }
        }}
       > </Dialog>

<model src="questgiver.glb"
  onClick={mineActive ? doClick() : null} />
      </>
  )
  
}
