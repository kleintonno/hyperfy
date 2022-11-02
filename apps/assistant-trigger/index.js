import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'
import { AssistantQuest } from './assistant'

export default function App() {
  const videoRef = useRef()
  return (
    <app>
      <group position={[0, 1.5, -10]}>
        <video
          height={2}
          ref={videoRef}
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoplay={false}
        />
        <trigger
          size={10}
          onEnter={() => videoRef.current.play()}
          onLeave={() => videoRef.current.pause()}
        />
      </group>
    </app>
  )
}
