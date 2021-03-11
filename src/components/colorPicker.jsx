import React from 'react'
import { SketchPicker } from 'react-color'
 
export default function ColorPicker({BGC, setBGC, hidePrompt}){

    const handleChangeComplete = (color) => {
        setBGC({ background: color.hex });
        hidePrompt();
    };
    return (
     <SketchPicker
        color={ BGC.background }
        onChangeComplete={ handleChangeComplete }
        />
    );
}
