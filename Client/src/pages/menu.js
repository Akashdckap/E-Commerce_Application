import React, { Fragment } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
export default function MenuList() {
    return (
        <div className='min-h-screen bg-indigo-100 flex justify-end p-4'>
            <Menu as='div' className="relative">
                <Menu.Button>
                    Open Menu
                    <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden="true" />
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                </Menu.Items>
            </Menu>
        </div>
    )
}
