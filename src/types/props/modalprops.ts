import { UnknownAction } from "@reduxjs/toolkit";
import React from "react";

export interface ModalProps {
    isOpen?: boolean;
    onClose: () => UnknownAction;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}