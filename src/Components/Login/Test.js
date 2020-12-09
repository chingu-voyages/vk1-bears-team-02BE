import React, { useContext } from 'react';
import { AuthenticationContext } from '../context/AuthenticationContext';

const Test = () => {
    const { details, setDetails } = useContext(AuthenticationContext);
    var testing = details.username
    return (
        <div>

            {
                <li> {testing}</li>
                // details.map(detail => (
                //     <li>{detail.username}</li>
                // ))
            }

        </div>
    )
}
export { Test }