import css from './SidebarNotes.module.css'

const categories = [
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
];

export default function SidebarNotes() {
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            <li className={css.menuItem}>
                <a href={`/notes/filter/all`} className={css.menuLink}>
                All notes
                </a>
            </li>
            {categories.map((category) => (
                <li key={category} className={css.menuItem}>
                    <a href={`/notes/filter/${category}`} className={css.menuLink}>
                    {category}
                    </a>
                </li>
            ))}
            
        </ul>
    )
}