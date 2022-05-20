import { useState } from "react"

export const useForm = ( initialValue = {} ) => {
  
    const [inputValue, setInputValue] = useState(initialValue)

    const handleInputChange = ( {target} ) => {
        setInputValue({
            ...inputValue,
            [target.name]: target.value
        })
    }

    const reset = () => setInputValue( initialValue )

    return [ inputValue, handleInputChange, setInputValue, reset ]
}
