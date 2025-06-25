'use client';
import React from 'react'
import Tracker from './Tracker'
import { useRunningStore } from '@/store/useRunningStore'

export default function TrackerWrap() {
  const {isTracking} = useRunningStore();
  return (
    <>
        {isTracking &&<Tracker/>}
    </>
  )
}
