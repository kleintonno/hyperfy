import React, { useRef, useEffect, useState } from 'react'
import { DEG2RAD, useWorld, useFields, useSyncState } from 'hyperfy'

import { Tween } from './Tween'

export const blenderVec3 = ([x, y, z]) => [x, z, -y]

const lidOffset = blenderVec3([0, 0.342208, 0.370742])

const OPEN_CLOSE_SPEED = 0.5

export default function TreasureChest() {
  const world = useWorld()
  const lidRef = useRef()
  const [state, dispatch] = useSyncState(state => state)

  useEffect(() => {
    const lid = lidRef.current
    const tween = state.open ? openTween : closeTween
    return world.onUpdate(delta => {
      tween.set(world.getServerTime() - state.time)
      lid.setRotationX(tween.value.deg * DEG2RAD)
    })
  }, [state.time])

  function onClick() {
    const time = world.getServerTime()
    dispatch('setOpen', !state.open, time)
  }

  return (
    <app>
      <skysphere src="sky2.png" encoding="srgb" />

      {/* Descendants Magic Eden link*/}
      {<billboard position={[-18, 1.7, -8]} axis="y">
        <text
          value={'Click here to purchase Descendants'}
          bgColor="black"
          color="white"
          bgRadius={0.1}
          padding={0.2}
          onClick={e => {engine.open('https://www.magiceden.io/marketplace/descendants', true)}} // open link in a new tab
        />
      </billboard>}

      <rigidbody type="kinematic">
        <model
          ref={lidRef}
          src="treasure-chest-top.glb"
          position={lidOffset}
          onClick={onClick}
        />
        <model src="treasure-chest-bottom.glb" onClick={onClick} />
      </rigidbody>
    </app>
  )
}

const initialState = {
  open: false,
  time: -9999,
}

export function getStore(state = initialState) {
  return {
    state,
    actions: {
      setOpen(state, open, time) {
        state.open = open
        state.time = time
      },
    },
  }
}

const openTween = new Tween({ deg: 0 }).to({ deg: -130 }, OPEN_CLOSE_SPEED, Tween.QUAD_IN_OUT) // prettier-ignore
const closeTween = new Tween({ deg: -130 }).to({ deg: 0 }, OPEN_CLOSE_SPEED, Tween.QUAD_IN_OUT) // prettier-ignore
