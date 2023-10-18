"use client";

import { useCallback, useState } from "react";
import { Dialog } from "@headlessui/react";

export const useModal = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((state) => !state), []);

  return { isOpen, open, close, toggle };
};

export function BaseModal(props: {
  children: React.ReactNode;
  isOpen: boolean;
  closeHandler: () => void;
}) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.closeHandler}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <Dialog.Panel className="bg-base-200 w-full max-w-lg rounded p-4">
          {props.children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
