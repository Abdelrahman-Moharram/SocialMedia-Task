import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import React from 'react'
import { GrNotification } from 'react-icons/gr'

const Notifications = () => {
  return (
    <div>
      
        <Popover __demoMode>
          <PopoverButton className="p-4 rounded-full bg-slate-100 hover:bg-slate-300">
            <GrNotification />
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="divide-y divide-white/5 mt-3 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="p-3">
              <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                <p className="font-semibold text-black">Insights</p>
                <p className="text-black/50">Measure actions your users take</p>
              </a>
              <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                <p className="font-semibold text-black">Automations</p>
                <p className="text-black/50">Create your own targeted content</p>
              </a>
              <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                <p className="font-semibold text-black">Reports</p>
                <p className="text-black/50">Keep track of your growth</p>
              </a>
            </div>
            <div className="p-3">
              <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                <p className="font-semibold text-black">Documentation</p>
                <p className="text-black/50">Start integrating products and tools</p>
              </a>
            </div>
          </PopoverPanel>
        </Popover>

    </div>
  )
}

export default Notifications
