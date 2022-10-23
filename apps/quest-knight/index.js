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
        <Quest2
          swordPosition={[0, 0, 0]}
          armorPosition={[0, 0, 0]}
          shieldPosition={[0, 0, 0]}
        />
      </app>
    </>
  )
}
