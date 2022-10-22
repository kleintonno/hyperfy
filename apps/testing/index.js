import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
import { Quest2 } from './Quest2'


export default function World() {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(true)
  const [visible3, setVisible3] = useState(false)


return (
  <>
   <app>
    <rigidbody>
        <model src="swordrack.glb" position={[10,0,10]} rotation={[0,0,0]} />
        <model src="bookshelf.glb" position={[-5, 0, -5]} />
        <model src="army33.glb" position={[0, 0, -5]} onClick={() => (setVisible(true),setVisible2(true),setVisible3(false))}/>
      {visible && (
        <model src="greenbook.glb" position={[-5, 0, -5]} onClick={() => (setVisible(false),setVisible2(false),setVisible3(true))}/>)}
      {visible2 && (
        <model src="wall.glb" position={[-5, 0, -5]}/>)}
      {visible3 && (
        <model src="doorway.glb" position={[-5, 0, -5]}/>)}
    </rigidbody>
 
    <Quest2  />


    </app>
  </>
)
      }