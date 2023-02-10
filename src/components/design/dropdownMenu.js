import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'

export default function Example(props) {

  const[action, setAction] = useState("");
  const handleChange = (e) => {
      setAction(e.target.value);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    props.onSubmit(action)
  }

  return (
    <div className="z-40 w-56">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Add filters
            <PlusIcon className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true"></PlusIcon>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div onSubmit={handleSubmit} className="px-1 py-1">
              {props.sort.map((s) =>(
                <Menu.Item key={s.id} onChange={handleChange}>
                  {({ active }) => (
                    <button type='submit' onClick={() => {props.valueChangeCallback(s.id)}}
                      className={`${
                        active ? 'bg-violet-500 text-white after:text-red-500' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {s.name} 
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
            </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
