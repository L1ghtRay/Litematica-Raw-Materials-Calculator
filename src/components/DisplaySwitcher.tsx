import React, { useState, type ReactNode } from "react";
import ToggleSwitch from "./common/ToggleSwitch";

interface DisplaySwitcherProps {
    className?: string;
    toggelSwitchProps?: Omit<React.ComponentProps<typeof ToggleSwitch>, 'state' | 'switchMode'>;
    element1?: ReactNode;
    element2?: ReactNode;
}

export default function DisplaySwitcher({ className, toggelSwitchProps, element1, element2 }: DisplaySwitcherProps) {
    const [button_state, setButtonState] = useState<true | false>(false);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <ToggleSwitch {...toggelSwitchProps} state={button_state} switchMode={setButtonState} />
            {!button_state ? element1 : element2}
        </div>
    );
}