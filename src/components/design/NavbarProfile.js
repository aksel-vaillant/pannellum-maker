import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function NavbarProfile(props) {

  let user = props.user;

  return (
    <div className="z-40">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center px-2 py-2 mt-1 bg-slate-100 font-semibold text-black rounded-full border-2 border-spacing-10 border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <img alt='user pic' src={user.photoURL} height={30} width={30} className="rounded-full mr-2 drop-shadow-2xl"/>            
            <p className='mt-0.5 w-full'>{user.displayName}</p>
            <ChevronDownIcon className="ml-2 -mr-1 mt-1 h-5 w-5 text-black" aria-hidden="true"></ChevronDownIcon>
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
          <Menu.Items className="absolute mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {props.children.map( (child, index) => <Menu.Item key={index} className="hover:text-pink-500 hover:font-semibold">{child}</Menu.Item>)}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
