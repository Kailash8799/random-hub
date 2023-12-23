import { useAppDispatch } from "@/redux/hooks";
import { ModalProps } from "@/types/props/modalprops";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  disabled,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  secondaryAction,
  secondaryLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      dispatch(onClose());
    }, 300);
  }, [disabled, onClose, dispatch]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="
      justify-center 
      items-center 
      flex 
      overflow-x-hidden 
      overflow-y-auto 
      fixed 
      inset-0 
      z-50 
      outline-none 
      focus:outline-none 
      bg-neutral-800/70
      "
      >
        <div
          className="
        relative 
        w-full 
        md:w-4/6 
        lg:w-3/6 
        xl:w-2/6 
        mx-auto 
        max-md:top-[20%]
        h-full 
        md:h-auto
        lg:h-auto
        "
        >
          {/* CONTENT */}
          <div
            className={`
                translate 
                duration-300
                my-auto
                ${showModal ? "translate-y-0" : "translate-y-full"}
                ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className={`
              translate 
              h-full
              md:h-auto
              lg:h-auto
              border-0
              rounded-lg
              shadow-lg
              relative
              flex
              flex-col
              w-full
              bg-white
              outline-none
              focus:outline-none
              my-auto
            `}
            >
              {/* HEADER */}
              <div
                className={`
                    flex items-center 
                    p-6
                    rounded-t
                    justify-center
                    relative
                    border-b-[1px]
                `}
              >
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute right-9"
                >
                  <X />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative px-6 mt-5 py-2 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex border-b-[1px] flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                    "
                >
                  <button
                    disabled={disabled}
                    onClick={handleSubmit}
                    className={`
                        relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                        bg-rose-500
                        border-rose-500
                        text-white
                        text-base
                        py-3
                        font-semibold
                        border-2
                     `}
                  >
                    {actionLabel}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                    "
                >
                  <button
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    className={`
                        relative
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        rounded-lg
                        hover:opacity-80
                        transition
                        w-full
                        bg-rose-500
                        border-rose-500
                        text-white
                        text-base
                        py-3
                        font-semibold
                        border-2
                     `}
                  >
                    {secondaryLabel}
                  </button>
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
