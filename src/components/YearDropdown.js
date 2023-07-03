import { useState } from "react";


import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
}

    from "reactstrap";

function YearDropdown({ year, setYear }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const startYear = 1990; // Database Earliest Entry
    const currentYear = 2023;

    // Populate Dropdown
    const years = Array.from(
        new Array(currentYear - startYear + 1), (_, index) => currentYear - index
    );

    // Toggle Dropdown State, set year to dropdown year
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const setYearDropdown = (year) => {
        setYear(year);
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>

            <DropdownToggle caret>
                {year ? year : 'Any Year'}
            </DropdownToggle>

            <DropdownMenu style={{
                maxHeight: '200px',
                overflowY: 'auto'
            }}>

                <DropdownItem onClick={
                    () => setYear('')}>
                    Any Year
                </DropdownItem>

                <DropdownItem divider />

                {years.map((year) => (
                    <DropdownItem
                        onClick={() => setYearDropdown(year)}
                        key={year}
                        value={year}>
                        {year}
                    </DropdownItem>))}

            </DropdownMenu>
        </Dropdown>
    )
}

export default YearDropdown;