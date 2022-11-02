import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
import { AssistantQuest } from './assistant'

export default function World() {
  return (
    <>
      <app>
        <AssistantQuest />
      </app>
    </>
  )
}
