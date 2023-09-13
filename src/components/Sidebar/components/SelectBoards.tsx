"use client"
import Add from '@/components/Add'
import { Board } from '@/schema/board'
import { Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiChevronUp } from '@react-icons/all-files/bi/BiChevronUp'
import { MdDashboard } from '@react-icons/all-files/md/MdDashboard'
export default function SelectBoards({ boards }: { boards: Board[] }) {
  const [open, toggleOpen] = useState(true)
  return (
    <div>
      {/* Trigger  */}
      <div className='flex items-center justify-between mb-4'>
        <button className='px-8 text-xl flex items-center gap-2 duration-300'  onClick={() => toggleOpen(!open)}><MdDashboard/>  Boards ({boards.length})</button>
        <span className='flex items-center gap-2 pr-2 mr-3'>
        <Add confirmBtnText='Add' cancelBtnText='Reset' triggerText='+' heading='New Board' inputPlaceholder='board name...' />
        <BiChevronUp onClick={() => toggleOpen(!open)} className={`${open ? "rotate-0" : "rotate-180"} transition-all duration-300`} />
        </span>
      </div>
      {/* Options  */}
      <Transition as='div' show={open} className='grid grid-cols-1 px-8 gap-3'>
        {boards.map(((board) => (
          <Link key={board.id} href={`/board/${board.id}`} className='flex gap-4'>
            <img src={board.icon} width={20} alt={board.name}/>
            {board.name}
          </Link>
        )))}
      </Transition>
    </div>
  )
}
