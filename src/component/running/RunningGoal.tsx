'use client';
import React from 'react'

import { useRunningStore } from '@/store/useRunningStore';
import RunningGoalInputModal from './RunningGoalInputModal';
import useModal from '@/hooks/useModal';
import Modal from '../Modal';
import Button from '../Button';

interface RunningGoalProps {
  className ?: string;
}

export default function RunningGoal({className=""} : RunningGoalProps) {
  const {runningGoal} = useRunningStore();
  const {isOpen , onOpen, onClose} = useModal();

  return (
    <section className={`${className}`}>
      <h3 className='sr-only'>러닝 목표</h3>
      <Button onClick={onOpen}>{runningGoal===null ? 0 : runningGoal}</Button>
      <div className='w-full border'></div>
      <Modal className={'z-100'} isOpen={isOpen} onClose={onClose} >
        <RunningGoalInputModal onClose={onClose}/>
      </Modal>
    </section>
  )   
}
