import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
import { MazeQuest } from './maze'

export default function World() {
  return (
    <>
      <app>
        <MazeQuest />
        <place label="maze_quest" position={[0, 0, 2.5]} rotationY={0} />
      </app>
    </>
  )
}
