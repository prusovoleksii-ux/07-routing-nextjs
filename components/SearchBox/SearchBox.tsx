import css from './SearchBox.module.css'

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

export default function SearchBox({onSearchChange}: SearchBoxProps) {

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onSearchChange(e.target.value);
    }

    return (
        <input
        className={css.input}
        type="text"
        onChange={handleChange}
        placeholder="Search notes"
        />
    )
}