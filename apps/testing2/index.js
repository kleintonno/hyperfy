import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
import { Dialog } from './Dialog'


export default function World() {

  const [view, setView] = useState(false)
  const [mineActive, setMineActive] = useState(false)

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
  }}


return (
  <>
  <app>
    <rigidbody>
        <model src="swordrack.glb" position={[10,0,10]} rotation={[0,0,0]} />
    </rigidbody>
 
    <Dialog
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

  </app>
</>
)
}