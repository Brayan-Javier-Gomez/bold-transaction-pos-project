import styles from "./Filter.module.scss"

interface FilterCheckboxProps {
  readonly id: string
  readonly label: string
  readonly checked: boolean
  readonly onChange: () => void
  readonly name?: string
}

export default function FilterCheckbox({ id, label, checked, onChange, name }: FilterCheckboxProps) {
  return (
    <div className={styles.filter__item}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
