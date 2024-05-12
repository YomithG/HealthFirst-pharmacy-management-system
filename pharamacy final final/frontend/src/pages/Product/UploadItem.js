//not using













import React, { useState } from "react";

function UploadItems() {
    const [image, setImage] = useState(null);

    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);


        const response = await fetch('/api/image', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("Image uploaded successfully");
        } else {
            console.error("Failed to upload image");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={onInputChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default UploadItems;
