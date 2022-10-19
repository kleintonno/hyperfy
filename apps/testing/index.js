import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'


export default function World() {
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(true)
  return (
    <app>
    <rigidbody>
    <model src="army33.glb" position={[0, 0, -1]} onClick={() => (setVisible(true),setVisible2(false))}/>
    <box color='blue' position={[2, 1, 0]}></box>
    {visible && (
      <box color='green' position={[4, 1, 0]} onClick={() => setVisible(false)}/>
    )}
</rigidbody>
</app>)
}