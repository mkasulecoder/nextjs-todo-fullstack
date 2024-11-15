import React from 'react';

const EditButton = ({item_id} : {item_id : string }) => {
    return (
        <div className="w-1/3">
            <button className="text-white w-full font-semibold bg-blue-700 rounded hover:bg-red-800">Edit</button>
        </div>
    );
};

export default EditButton;