import React from 'react'

import { Erika } from './Erika'

/**
 * To create your own emotive NPCs with dialog and quests, follow along
 * with the code below.
 *
 * `Erika.js` contains code unique to the NPC, including the dialog flow,
 * quest item placement and behaviours.
 *
 * `Dialog.js` is the entire logic for dialog boxes. You dont have to edit
 * this but its there if you need to change the background image or add additional
 * features.
 */

export default function Environment() {
  return (
    <app>
      <Erika position={[0, 0, 0]} armorPosition={[-10, 0, 10]} swordPosition={[10,0,10]}/>

      {/* <Erika position={[0, 0, 0]} armorPosition={[-82, 25, 83]} swordPosition={[140,11,-588]}/>*/}

      <model src="swordrack.glb" position={[10,0,10]} rotation={[0,0,0]} />

    </app>
  )
}
