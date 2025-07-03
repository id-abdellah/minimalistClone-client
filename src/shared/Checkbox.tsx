import type { ChangeEvent } from "react"

type Props = {
    checked: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void | (() => void)
}

export default function Checkbox({ checked, onChange }: Props) {
    return (
        <input onChange={onChange} type="checkbox" defaultChecked={checked} className="d-checkbox d-checkbox-xs checked:bg-primary rounded-sm" />
    )
}